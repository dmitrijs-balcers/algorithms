var expect = require("chai").expect;

function QU(arr) {
    this.arr = arr;
}

QU.prototype.find = function (p, q) {
    var arr = this.arr;

    return _root(p) === _root(q);

    function _root(i) {
        return i !== arr[i] ? _root(arr[i]) : i;
    }

};

QU.prototype.union = function (p, q) {
    this.arr[p] = q;
    return this;
};

describe("Quick Union", function () {
    it("should connect two paths", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(4, 3);

        expect(uf.arr).to.eql([0, 1, 2, 3, 3, 5, 6, 7, 8, 9]);
    });

    it("should connect three paths", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(4, 3).union(5, 3);

        expect(uf.arr).to.eql([0, 1, 2, 3, 3, 3, 6, 7, 8, 9]);
    });

    it("should find connection between two paths", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(4, 3).union(5, 3);

        expect(uf.find(4, 3)).to.be.true;
    });

    it("should not find connection between two paths", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(4, 3).union(5, 3);

        expect(uf.find(4, 7)).to.be.false;
    });

    it("should find connection between several paths", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(4, 3).union(5, 3).union(9,5);

        console.log(uf.arr);

        expect(uf.find(4, 9)).to.be.true;
    });
});