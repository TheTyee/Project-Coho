#!/usr/bin/perl -w

use strict;
use CGI;
use LWP::UserAgent;
use HTTP::Request::Common;

my $cgi = new CGI;
print $cgi->header("application/json");

my $ua = LWP::UserAgent->new;
my $r = $ua->post("http://localhost:9200/tyee/story/_search".($cgi->param("callback") ? "?callback=".$cgi->param("callback") : ""),
    Content => '{ "query": {"term": { "_id": "'.$cgi->param("uuid").'"} } }');

print $r->content if ($r->is_success);

