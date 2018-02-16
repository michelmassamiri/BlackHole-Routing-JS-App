#!/bin/bash

path='../'
cisco_img='c7200-jk9s-mz.124-13b.image'

echo "lauching router 1"

dynamips -P 7200 --idle-pc 0x6077b2bc -i 1 -X -T 2001 \
 -p 1:PA-FE-TX -s 1:0:udp:10003:127.0.0.1:10002 -p 2:PA-FE-TX -s 2:0:udp:10007:127.0.0.1:10006  ../c7200-jk9s-mz.124-13b.image & 

echo "lauching router 2"

dynamips -P 7200 --idle-pc 0x6077b2bc -i 2 -X -T 2002 \
 -p 1:PA-FE-TX -s 1:0:udp:10005:127.0.0.1:10004 -p 2:PA-FE-TX -s 2:0:udp:10009:127.0.0.1:10008 $path$cisco_img &

echo "lauching router 3"

dynamips -P 7200 --idle-pc 0x6077b2bc -i 3 -X -T 2003 \
 -p 1:PA-FE-TX -s 1:0:udp:11010:127.0.0.1:11009 -p 2:PA-FE-TX -s 2:0:udp:11016:127.0.0.1:11015 $path$cisco_img &

