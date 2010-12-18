#!/usr/bin/env perl

use local::lib '/var/home/tyeemobile/usr';
use Mojolicious::Lite;
use JSON;
use LWP::UserAgent;
use HTTP::Request::Common;
use Date::Format;

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

app->start;

