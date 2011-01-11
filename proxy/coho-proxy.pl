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

    $m->render(text => ($m->param("callback") ? $m->param("callback")."(" : "").encode_json($structure).($m->param("callback") ? ");" : ""),
        format => ($m->param("callback") ? "js" : "json"));

};

get '/latest/:count' => [count => qr/\d+/] => {count => 20} => sub {
    my $m = shift;

    my $count = $m->param("count");
    $count = 50 if $count > 50;

    my @time = gmtime(time);
    my $now = strftime("%Y-%m-%dT%TZ", @time);

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search".($m->param("callback") ? "?callback=".$m->param("callback") : ""),
        Content => '{ "from": 0, "size": '.$count.', "sort" : [ { "storyDate" : { "reverse" : true } } ], "query" : { "range" : { "storyDate": { "to" : "' . $now . '"} } } }');

    $m->render(text => $r->content, format => ($m->param("callback") ? "js" : "json"));

};

get '/latest/short/:count' => [count => qr/\d+/] => {count => 20} => sub {
    my $m = shift;

    my $count = $m->param("count");
    $count = 50 if $count > 50;

    my @time = gmtime(time);
    my $now = strftime("%Y-%m-%dT%TZ", @time);

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search".($m->param("callback") ? "?callback=".$m->param("callback") : ""),
        Content => '{ "script_fields": {"title": {"script":"_source.title"}, "teaser": {"script":"_source.teaser"}}, "from": 0, "size": '.$count.', "sort" : [ { "storyDate" : { "reverse" : true } } ], "query" : { "range" : { "storyDate": { "to" : "' . $now . '"} } } }');

    $m->render(text => $r->content, format => ($m->param("callback") ? "js" : "json"));

};

get '/story/:uuid' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $r = $ua->post("http://localhost:9200/tyee/story/_search".($m->param("callback") ? "?callback=".$m->param("callback") : ""),
        Content => '{ "query": {"term": { "_id": "'.$m->param("uuid").'"} } }');

    $m->render(text => $r->content, format => ($m->param("callback") ? "js" : "json"));
};

get '/search/(*query)' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $elastic = { size => 25, query => {field => { title => $m->param("query") } } };

    my $r = $ua->post("http://localhost:9200/tyee/story/_search".($m->param("callback") ? "?callback=".$m->param("callback") : ""),
        Content => encode_json($elastic));

    $m->render(text => $r->content, format => ($m->param("callback") ? "js" : "json"));
};

get '/topic/:topic' => sub {
    my $m = shift;

    my $ua = LWP::UserAgent->new;
    my $elastic = { size => 25, query => {field => { topics => $m->param("topic") } } };

    my $r = $ua->post("http://localhost:9200/tyee/story/_search".($m->param("callback") ? "?callback=".$m->param("callback") : ""),
        Content => encode_json($elastic));

    $m->render(text => $r->content, format => ($m->param("callback") ? "js" : "json"));
};

app->start;

