#!/usr/bin/perl -w

use strict;
use CGI;
use LWP::UserAgent;
use HTTP::Request::Common;

my $cgi = new CGI;
print $cgi->header("application/json");

my $ua = LWP::UserAgent->new;
my $r = $ua->post("http://localhost:9200/tyee/story/_search".($cgi->param("callback") ? "?callback=".$cgi->param("callback") : ""),
    Content => '{ "from": 0, "size": 20, "sort" : [ { "publish_date" : { "reverse" : true } } ], "query" : { "range" : { "publish_date": { "from" : "2010-10-10T00:00:00Z", "to": "2010-11-30T00:00:00Z" } } } }');

print $r->content if ($r->is_success);

