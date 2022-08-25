Where is the definition of the constants (?) MsgQrl, MsgQrl2, msgLongCQ, MsqQsy ?


1) In RndFunc.pas

- why Rayleigh deviates is computed generating two uniform random numbers, as only one is needed?
	i.e.   Result := AMean * Sqrt(-Ln(Random) - Ln(Random));
	instead of   Result := AMean * Sqrt(-2 * Ln(Random));

- why Poisson deviates is computed over a loop of 30 (instead of open ended while-loop), de facto
  making zero the probability of obtaining integeres larger than 30?



2) In QrnStn.pas

- Envelope is resized (randomly) on the basis of the new Blocks, but in the for loop its elements
  are (randomly initialized) but only in 10% of the cases, selected randomly. This risks of leaving
  some of Envelope elements undefined (after resizing).
