// http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018
// This algorithm is too slow
// Takes N^2 array access to process sequence of N union commands on N objects

var expect = require("chai").expect;

function QF(arr) {
    this.arr = arr; // Order of growth === N
}

QF.prototype.connected = function (p, q) {
    return this.arr[p] === this.arr[q]; // Order of growth === 1
};

QF.prototype.union = function (p, q) {
    var arr = this.arr, pid = arr[p], qid = arr[q];

    if (this.connected(p, q)) return this;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === pid) (arr[i] = qid) // Order of growth === N
    }
    return this;
};


describe("Union Find", function () {
    describe("quickFind", function () {
        it("should connect two paths", function () {
            var uf = new QF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            uf.union(1, 2);

            expect(uf.arr).to.eql([0, 2, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it("should find connection between two paths", function () {
            var uf = new QF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

            expect(uf.union(1, 2).connected(1, 2)).to.be.true;
        });

        it("should connect three paths", function () {
            var uf = new QF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            uf.union(1, 2).union(2, 3);

            expect(uf.arr).to.eql([0, 3, 3, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
});