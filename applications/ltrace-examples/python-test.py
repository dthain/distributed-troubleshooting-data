#!/usr/bin/python
#
#Copyright (C) 2016- The University of Notre Dame
#This software is distributed under the GNU General Public License.
#
import os

me = os.environ["USER"]
os.environ["USER"] = "NOTME"

f = open("test.txt", "a+")
f.write("Test.\n")
f.close()

exit(0)
