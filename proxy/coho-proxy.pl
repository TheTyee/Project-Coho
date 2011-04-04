#!/usr/bin/env perl

use local::lib '/var/home/tyeemobile/usr';
use Mojolicious::Lite;
use JSON;
use LWP::UserAgent;
use HTTP::Request::Common;
use Date::Format;

get '/latest/grouped' => sub {
    my $m = shift;

    my @time = gmtime(time);
    my $now = strftime("%Y-%m-%dT%TZ", @time);

    my $fetch_subset = sub {
        my $query = shift;
        my $tag = shift;

        my $ua = LWP::UserAgent->new;
        my $r = $ua->post("http://localhost:9200/tyee/story/_search",
            Content => encode_json($query));
        my $j = decode_json($r->content);

        foreach my $node (@{$j->{'hits'}->{'hits'}}) {
            $node->{'_source'}->{'group'} = $tag;
        }

        return $j;
    };

    # today's features
    my $elastic = { from => 0, size => 4,
                    "sort" => [ { "storyDate" => { "reverse" => 1 } } ],
                    query => {field => { section => "Opinion News Mediacheck Arts Books Life" } } };
    my $structure = &$fetch_subset($elastic, "Today's Features");

    # the hook
    $elastic->{'size'} = 8;
    $elastic->{'query'} = { field => { story_type => "blog" } };
    my $j = &$fetch_subset($elastic, "The Hook Blog");
    push @{$structure->{'hits'}->{'hits'}}, @{$j->{'hits'}->{'hits'}};

    # news sections
    my %titles = (Arts => "Arts & Culture");
    $elastic->{'size'} = 6;
    foreach my $section (qw/News Opinion Mediacheck Arts Books Life/) {
        $elastic->{'query'} = { field => { section => $section } };
        $j = &$fetch_subset($elastic, $titles{$section} || $section);
        push @{$structure->{'hits'}->{'hits'}}, @{$j->{'hits'}->{'hits'}};
    }

    # package up and render
    my $json = nice_encode_json($structure);
    proxy_render($m, $json);
};

get '/latest/:count' => [count => qr/\d+/] => {count => 20} => sub {
    my $m = shift;

    my $count = $m->param("count");
    $count = 50 if $count > 50;

    my @time = gmtime(time);
    my $now = strftime("%Y-%m-%dT%TZ", @time);

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search",
        Content => '{ "from": 0, "size": '.$count.', "sort" : [ { "storyDate" : { "reverse" : true } } ], "query" : { "range" : { "storyDate": { "to" : "' . $now . '"} } } }');

    proxy_render($m, json_to_json($r->content));
};

get '/latest/short/:count' => [count => qr/\d+/] => {count => 20} => sub {
    my $m = shift;

    my $count = $m->param("count");
    $count = 50 if $count > 50;

    my @time = gmtime(time);
    my $now = strftime("%Y-%m-%dT%TZ", @time);

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search",
        Content => '{ "script_fields": {"title": {"script":"_source.title"}, "teaser": {"script":"_source.teaser"}}, "from": 0, "size": '.$count.', "sort" : [ { "storyDate" : { "reverse" : true } } ], "query" : { "range" : { "storyDate": { "to" : "' . $now . '"} } } }');

    proxy_render($m, json_to_json($r->content));
};

get '/story/:uuid' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search",
        Content => '{ "query": {"term": { "_id": "'.$m->param("uuid").'"} } }');

    proxy_render($m, json_to_json($r->content));
};

get '/search/(*query)' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $elastic = { size => 25, query => {field => { title => $m->param("query") } } };

    my $r = $ua->post("http://localhost:9200/tyee/story/_search",
        Content => encode_json($elastic));

    proxy_render($m, json_to_json($r->content));
};

get '/topic/:topic' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $elastic = { "size" => 25,
                    "sort" => [ { "storyDate" => { "reverse" => 1 } } ],
                    query => {field => { section => $m->param("topic") } } };

    my $r = $ua->post("http://localhost:9200/tyee/story/_search",
        Content => encode_json($elastic));

    proxy_render($m, json_to_json($r->content));
};

app->types->type(js => 'application/x-javascript; charset=utf-8');
app->types->type(json => 'application/json; charset=utf-8');

app->start;


### helper functions ###

# Takes a JSON string and outputs a nicely encoded JSON string
sub json_to_json
{
    my $json = shift;

    return nice_encode_json(decode_json($json));
}

# Nicely encodes an object to a JSON string. Unicode characters too!
sub nice_encode_json
{
    my $obj = shift;

    return JSON->new->ascii(1)->encode($obj);
}

# Tells Mojo to render some JSON.
# Handles the JSON/JSONP formatting too.
sub proxy_render
{
    my $m = shift;
    my $json = shift;

    $json = $m->param("callback")."(".$json.");" if $m->param("callback");
    $m->render(text => $json, format => ($m->param("callback") ? "js" : "json"));
}

