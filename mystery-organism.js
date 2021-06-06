// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/* Factory function that generates new specimens, and includes functions to mutate specimen DNA at one 
 base randomly, to compare and calculate percentage symmetry between two DNA sequences and to predict likely survival
 of an organism specimen based on DNA GC content.
 */ 

const pAequorFactor = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      const mutantIndex = Math.floor(Math.random() * dna.length);
      const baseToMutate = this.dna[mutantIndex];
      let newMutantBase = returnRandBase();
      while (newMutantBase === baseToMutate) {
        let newMutantBase = returnRandBase();
      };
      dna[mutantIndex] = newMutantBase;
      return dna;
    },
    compareDNA(otherSubject) {
      let count = 0;
      const thisSubjectDna = this.dna;
      const otherSubjectDna = otherSubject.dna
      for (let i = 0; i < thisSubjectDna.length; i++) {
        if (thisSubjectDna[i] === otherSubjectDna[i]) {
          count += 1;
        };
      };
      const denominator = thisSubjectDna.length > otherSubjectDna.length ? thisSubjectDna.length : otherSubjectDna.length;
      const percentageMatch = (count / denominator) * 100;

      return 'Input specimens have ' + percentageMatch  + '% DNA in common.';   
    },

    willLikelySurvive() {
      let cAndgCount = 0;
      const thisSubjectDna = this.dna;
      for(let i = 0; i < thisSubjectDna.length; i++) {
        if (thisSubjectDna[i] === 'G' || thisSubjectDna[i] === 'C') {
          cAndgCount += 1;
        };
      };
      const gcPercentage = (cAndgCount / thisSubjectDna.length) * 100;
      return gcPercentage >= 60;
    }
  };
};

/* Object property tests:
const newOrganism1 = pAequorFactor(1, mockUpStrand());
const newOrganism2 = pAequorFactor(2, mockUpStrand());
console.log('Original DNA 1: ' + newOrganism1.dna);
console.log('Original DNA 2: ' + newOrganism2.dna);
*/

// Mutation test: console.log('Mutated DNA: ' + newOrganism1.mutate());

// DNA comparison test: console.log(newOrganism1.compareDNA(newOrganism2));

// Survival test: console.log(newOrganism1.willLikelySurvive());

// Generates 30 instances of p. Aequor that are likely to survive in their natural environment:

const batchOfOrganisms = n => {
  const organismsArr = [];
  for (let i = 0; organismsArr.length < n; i++) {
    const newOrganism = pAequorFactor(i, mockUpStrand());
    if (newOrganism.willLikelySurvive()) {
      organismsArr.push(newOrganism);
    };
  };
  return organismsArr;
};

// p. Aequor organism batch generator test: console.log(batchOfOrganisms(30));