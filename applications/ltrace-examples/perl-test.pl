#!/usr/bin/perl
#
#Copyright (C) 2016- The University of Notre Dame
#This software is distributed under the GNU General Public License.
#

use strict; 
use Scalar::Util qw(looks_like_number);

my $usr = $ENV{USER};

$ENV{USER} = "NOTME";

open(OUT, ">>", "test.txt");
print(OUT "Test.\n");
close(OUT);

exit 0;
