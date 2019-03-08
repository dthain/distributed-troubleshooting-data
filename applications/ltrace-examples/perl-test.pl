#!/usr/bin/perl
#
#Copyright (C) 2016- The University of Notre Dame
#This software is distributed under the GNU General Public License.
#

use strict; 
use Scalar::Util qw(looks_like_number);

$SIG{INT} = \&cleanup;
$SIG{TERM} = \&cleanup;

my $usr = $ENV{USER};

open(OUT, ">>", "test.txt");
print(OUT "Test.\n");
close(OUT);

exit 0;
