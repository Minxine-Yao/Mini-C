.DATA
.TEXT   0x10c8
start: addi  $gp,$0,1
  mfc0  $k0,$14,0
loop: sw  $t0,0xfc50($0)
  bne $gp,$0,loop
  mtc0  $k0,$14,0
  eret
