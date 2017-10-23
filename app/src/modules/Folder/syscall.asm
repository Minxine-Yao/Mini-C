.DATA

.TEXT   0x1000
start: mfc0 $t0,$13,0
  addi  $t1,$t0,0
  addi  $t2,$t0,0
  addi  $t3,$0,0
  addi  $t4,$0,8
  andi   $t1,$t1,0x007c
  srl   $t1,$t1,2
  beq   $t1,$t3,interrupt
  eret
interrupt: srl  $t2,$t2,8
  addi  $t3,$0,1
  addi  $t4,$0,2
  beq $t2,$t3,0x1190
  beq $t2,$t4,0x11e0