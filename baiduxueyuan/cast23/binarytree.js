/**
 * Created by liuzhen on 16/9/13.
 * https://segmentfault.com/a/1190000004334208
 * insert(key): 向树中插入一个新的键
 * inOrderTraverse(): 通过中序遍历方式，遍历所有节点
 * preOrderTranverse(): 通过先序遍历方式，遍历所有节点
 * postOrderTranverse(): 通过后序遍历方式，遍历所有节点
 * min(): 返回树中最小的值
 * max(): 返回树中最大的值
 * search(key): 搜索某个值，在树中则返回true
 * remove(key): 从树中移除某个键
 */
function init() {
    var Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };
    var root = null;
    this.insert = function (key) {
        var newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode);
        }
    }
    this.view = function(boolean){
        if(boolean === undefined){
            return root;
        }else{
            return arr;
        }

    }
    this.inOrderTranverse = function(){
        var arr = [];
        LDR(arr,root);
        return arr;

    }
    this.preOrderTranverse = function(){
        var arr = [];
        DLR(arr,root);
        return arr;
    }
    this.postOrderTranverse = function(){
        var arr = [];
        LRD(arr,root);
        return arr;
    }
    this.min = function(){
        return gatMin(root);
    }
    this.max = function(){
        return gatMax(root);
    }
    this.search = function(value){
        return search(root,value);
    }
}
function insertNode(node,newNode) {
    if(node.key > newNode.key){
        if(node.left === null){
            node.left = newNode;
        }else{
            insertNode(node.left,newNode);
        }
    }else{
        if(node.right === null){
            node.right = newNode;
        }else{
            insertNode(node.right,newNode);
        }
    }
}
function LDR(arr,node){
    if(node){
        LDR(arr,node.left);
        arr.push(node.key);
        LDR(arr,node.right);
    }
}
function DLR(arr,node){
    if(node){
        arr.push(node.key);
        DLR(arr,node.left);
        DLR(arr,node.right);

    }
}
function LRD(arr,node){
    if(node){
        DLR(arr,node.left);
        DLR(arr,node.right);
        arr.push(node.key);
    }
}
function gatMin(node){
    if(node !== null){
        while(node){
            if(node.left === null){
                break;
            }
            node=node.left;
        }
        return node.key;
    }
}
function gatMax(node){
    if(node !== null){
        while(node){
            if(node.right === null){
                break;
            }
            node=node.right;
        }
        return node.key;
    }
}
function search(node,value){
    if(node === null){
        return false;
    }else if(node.key > value){
        return search(node.left,value);
    }else if(node.key < value){
        return search(node.right,value);
    }else{
        return true;//如何只返回最终结果值?
    }
}
var ex1 = new init();
ex1.insert(2);
ex1.insert(1);
ex1.insert(3);
ex1.insert(12);
ex1.insert(21);
ex1.insert(33);
ex1.insert(22);
console.log(ex1.view());
ex1.inOrderTranverse();
ex1.preOrderTranverse();
ex1.postOrderTranverse();
console.log(ex1.min());
console.log(ex1.max());
console.log(ex1.search(12));


