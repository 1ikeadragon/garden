---
title: Dynamic allocation
---
The term dynamic allocation, implies the existence of static allocation. So, start from there.
## static allocation
Whenever dynamic allocation is talked about, the heap comes into the picture while the stack is *pushed out of it.* Why?

It's not like memory allocations for stack are different that for the heap. the `malloc()` calls allocate memory dynamically of a user/programmer defined size so does the buffers on the stack. 
```c
int main(void){
	int sz;
	scanf("%d",&sz);
	char buf[sz];
	buf = {'11','42','24'};
}
```

