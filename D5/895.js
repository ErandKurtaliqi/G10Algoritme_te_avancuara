
class FreqStack {
  constructor() {
    this.freq = new Map();      

    this.group = new Map();     

    this.maxFreq = 0;           
  }

  push(val) {
    const f = (this.freq.get(val) || 0) + 1;
    this.freq.set(val, f);

    if (f > this.maxFreq) this.maxFreq = f;

    if (!this.group.has(f)) this.group.set(f, []);
    this.group.get(f).push(val);
  }

  pop() {
  
    const stack = this.group.get(this.maxFreq);

    const val = stack.pop();

    this.freq.set(val, this.freq.get(val) - 1);

    if (stack.length === 0) {
      this.group.delete(this.maxFreq);
      this.maxFreq--;
    }

    return val;
  }
}


const freqStack = new FreqStack();

freqStack.push(5);
freqStack.push(7);
freqStack.push(5);
freqStack.push(7);
freqStack.push(4);
freqStack.push(5);

console.log(freqStack.pop()); // 5
console.log(freqStack.pop()); // 7
console.log(freqStack.pop()); // 5
console.log(freqStack.pop()); // 4
