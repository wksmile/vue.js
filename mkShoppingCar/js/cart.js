var vm = new Vue({
    el: '#app',
    data: {
        produceList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag: false,
        curProduce: null
    },
    filters: {
        formatMoney: function(value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.cartView();
            this.calcTotalPrice();
        });
    },
    methods: {
        cartView: function() {
            var _this = this;
            vm.$http.get("data/cartData.json").then(function(res) {
                _this.produceList = res.body.result.list;
            });
        },
        changeMoney: function(produce, way) {
            if (way > 0) {
                produce.produceQuentity++;
            } else {
                produce.produceQuentity--;
                if (produce.produceQuentity < 1) {
                    produce.produceQuentity = 1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduce: function(item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.produceList.forEach(function(item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice: function() {
            var _this = this;
            this.totalMoney = 0;
            this.produceList.forEach(function(item, index) {
                if (item.checked) {
                    _this.totalMoney += item.producePrice * item.produceQuentity;
                }
            });
        },
        delConfirm: function(item) {
            this.delFlag = true;
            this.curProduce = item;
        },
        delItem: function() {
            var index = this.produceList.indexOf(this.curProduce);
            this.produceList.splice(index, 1);
            this.delFlag = false;
        }
    }
});

Vue.filter("money", function(value, type) {
    return "￥" + value.toFixed(2) + type;
});