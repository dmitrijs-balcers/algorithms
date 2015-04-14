// Trees can get too tall.
// Find is too expensive

var expect = require("chai").expect;

function QU(arr) {
    this.arr = arr; // Order of growth N
}

QU.prototype.root = function (i) {
    return i !== this.arr[i] ? this.root(this.arr[i]) : i;
};

QU.prototype.find = function (child, parent) {
    return this.root(child) === this.root(parent); // Order of growth === N
};

QU.prototype.union = function (child, parent) {
    // It is required to find ar root, so union of trees would be performed at roots
    // In such way, trees will be less deep
    this.arr[this.root(child)] = this.root(parent); // Order of growth N (includes cost of finding roots)
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

        expect(uf.find(4, 9)).to.be.true;
    });
    
    it("should union two trees", function () {
        var uf = new QU([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        uf.union(0, 1).union(2, 1).union(3,2);
        uf.union(4, 5).union(6, 5).union(7,4);
        uf.union(0, 7);

        expect(uf.find(0, 7)).to.be.true;
    });
});