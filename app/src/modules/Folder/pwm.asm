.DATA
.TEXT 0x1168
start: sh $a0,0xfc30($0)
  sh  $a1,0xfc32($0)
  sh  $a2,0xfc34($0)
  eret