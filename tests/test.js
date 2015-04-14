// http://code.tutsplus.com/tutorials/testing-in-nodejs--net-35018

var expect = require("chai").expect;

function UF(arr) {
    this.arr = arr;
}

UF.prototype.connected = function (p, q) {
    return this.arr[p] === this.arr[q];
};

UF.prototype.union = function (p, q) {
    var arr = this.arr, pid = arr[p], qid = arr[q];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === pid) (arr[i] = qid)
    }
    return this;
};


describe("Union Find", function () {
    describe(".parse()", function () {
        it("should connect two paths", function () {
            var uf = new UF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            uf.union(1, 2);

            expect(uf.arr).to.eql([0, 2, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it("should find connection between two paths", function () {
            var uf = new UF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            uf.union(1, 2);

            expect(uf.connected(1, 2)).to.be.true;
        });

        it("should connect three paths", function () {
            var uf = new UF([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            uf.union(1, 2);
            uf.union(2, 3);

            expect(uf.arr).to.eql([0, 3, 3, 3, 4, 5, 6, 7, 8, 9]);
        });
    });
});