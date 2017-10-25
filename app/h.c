void main()

{

    int a=0,b=1,c=0,n=0,m=0;

    int u=2049,v=0,w=0,x=5;

    syscall(u,v,w,x);

    u=0;

    v=0;

    x=6;

    n=syscall(u,v,w,x);

    while(m<n)

    {

        c=a;

        a=b;

        b=c+b;

        m++;

    }

    u=a;

    v=65280;

    x=0;

    syscall(u,v,w,x);

    u=1025;

    v=0;

    x=5;

    syscall(u,v,w,x);

    while(1);

}







