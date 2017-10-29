.DATA
.TEXT 0x1118
start: addi  $t0,$a0,0
  addi  $t1,$a0,0
  srl $t1,$t1,16
  sh  $t0,0xfc00($0)
  sh  $t1,0xfc02($0)
  sh  $a1,0xfc04($0)
  eret
