var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Data = require('../index'),
  Store = Data.Store;

describe("测试单一路径，一起保存",function(){

  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : 'data/save_all.json',
      method : 'POST'
    }
  });
  
  it('加载数据',function(done){
    store.load();
    setTimeout(function(){
      var data = store.getResult();
      expect(data.length).not.to.be(0);
      done();
    }, 200);
  });

  it('添加、修改、删除数据',function(){
    var obj = {value : 'new',text : 'new'};
    store.add(obj);
    expect(BUI.Array.contains(obj,store.get('newRecords'))).to.be(true);

    var obj1 = store.find('value',"1");
    obj1.text = 'update 1';
    store.update(obj1);
    expect(BUI.Array.contains(obj1,store.get('modifiedRecords'))).to.be(true);

    var obj2 = store.find('value',"2");
    store.remove(obj2);

    expect(BUI.Array.contains(obj2,store.get('deletedRecords'))).to.be(true);

  });

  it('保存数据',function(done){

    store.save('all', null, function(data){
      expect(data.hasError).to.be(false);
      expect(store.get('newRecords').length).to.be(0);
      expect(store.get('modifiedRecords').length).to.be(0);
      expect(store.get('deletedRecords').length).to.be(0);

      done();
    });

  });
});


describe('测试单一路径，分别保存',function(){
  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : 'data/save_all.json',
      method : 'POST'
    }
  });

  it('加载数据',function(done){
    store.load();
    setTimeout(function(){
      var data = store.getResult();
      expect(data.length).not.to.be(0);
      done()
    }, 200);
  });

  it('测试添加记录',function(done){
    var obj = {value : 'new',text : 'new'};
    store.add(obj);
    expect(BUI.Array.contains(obj,store.get('newRecords')));

    store.save('add',obj,function(data){
      expect(data.id).not.to.be(undefined);
      obj.id = data.id;

      expect(obj.id).not.to.be(undefined);
      expect(store.get('newRecords').length).to.be(0);
      
      done();
    });
  });

  it('测试更新数据',function(done){
    var obj = store.find('value','1');
    obj.text = 'new text';

    store.update(obj);
    expect(BUI.Array.contains(obj,store.get('modifiedRecords')));


    store.save('update', obj, function(data){
      expect(data.success).to.be(true);
      expect(store.get('modifiedRecords').length).to.be(0);
      done();
    });

  });

  it('测试删除记录',function(done){
    var obj = store.find('value','2');

    store.remove(obj);
    expect(BUI.Array.contains(obj,store.get('deletedRecords')));


    store.save('remove',obj,function(data){
      expect(data.success).to.be(true);
      expect(store.get('deletedRecords').length).to.be(0);
      done();
    });

  });
});

describe('测试多路径，分别保存',function(){
  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : {
        addUrl : 'data/add.json',
        updateUrl : 'data/update.json',
        removeUrl : 'data/remove.json'
      },
      method : 'POST'
    }
  });

  it('加载数据',function(done){
    store.load();
    setTimeout(function(){
      var data = store.getResult();
      expect(data.length).not.to.be(0);
      done();
    }, 200);
  });

  it('测试添加记录', function(done){
    var obj = {value : 'new',text : 'new'};
    store.add(obj);
    expect(BUI.Array.contains(obj,store.get('newRecords')));

    store.save('add',obj,function(data){
      expect(data.id).not.to.be(undefined);
      obj.id = data.id;
      expect(obj.id).not.to.be(undefined);
      expect(store.get('newRecords').length).to.be(0);
      done();
    });

  });

  it('测试更新数据',function(){
    var obj = store.find('value','1');
    obj.text = 'new text';

    store.update(obj);
    expect(BUI.Array.contains(obj,store.get('modifiedRecords')));

    store.save('update',obj,function(data){
      expect(data.success).to.be(true);
      expect(store.get('modifiedRecords').length).to.be(0);
    });

  });

  it('测试删除记录',function(done){
    var obj = store.find('value','2');

    store.remove(obj);
    expect(BUI.Array.contains(obj,store.get('deletedRecords')));

    store.save('remove',obj,function(data){
      expect(data.success).to.be(true);
      expect(store.get('deletedRecords').length).to.be(0);
      done();
    });

  });
});

describe('测试不指定类型',function(){
  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : {
        addUrl : 'data/add.json',
        updateUrl : 'data/update.json',
        removeUrl : 'data/remove.json'
      },
      method : 'POST'
    }
  });

  it('加载数据',function(done){
    store.load();
    setTimeout(function(){
      var data = store.getResult();
      expect(data.length).not.to.be(0);
      done();
    }, 200);
  });

  it('测试添加记录',function(done){
    var obj = {value : 'new',text : 'new'};
    store.add(obj);
    expect(BUI.Array.contains(obj,store.get('newRecords')));

    store.save(obj,function(data){
      expect(data.id).not.to.be(undefined);
      obj.id = data.id;
      expect(obj.id).not.to.be(undefined);
      expect(store.get('newRecords').length).to.be(0);
      done();
    });

  });

  it('测试更新数据',function(done){
    var obj = store.find('value','1');
    obj.text = 'new text';

    store.update(obj);
    expect(BUI.Array.contains(obj,store.get('modifiedRecords')));

    store.save(obj,function(data){
      expect(data.success).to.be(true);
      expect(store.get('modifiedRecords').length).to.be(0);
      done();
    });

  });

  it('测试删除记录',function(done){
    var obj = store.find('value','2');

    store.remove(obj);
    expect(BUI.Array.contains(obj,store.get('deletedRecords')));

    store.save(obj,function(data){
      expect(data.success).to.be(true);
      expect(store.get('deletedRecords').length).to.be(0);
      done();
    });

  });
});


describe('测试事件、回调',function(){
  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : 'data/save_all.json',
      method : 'POST'
    }
  });

  it('加载数据',function(done){
    store.load();
    setTimeout(function(){
      var data = store.getResult();
      expect(data.length).not.to.be(0);
      done();
    }, 200);
  });

  it('测试事件',function(done){
    var before = sinon.spy(),
      saved = sinon.spy(),
      obj = {};

    function fn1(ev){
      expect(ev.type).to.be('add');
      expect(ev.saveData).to.be(obj);
      before();
    }

    function fn2(ev){
      expect(ev.type).to.be('add');
      expect(ev.saveData).to.be(obj);
      expect(ev.data.id).not.to.be(undefined);
      saved();
    }

    store.on('beforesave',fn1);

    store.on('saved', fn2);
    store.add(obj);
    store.save('add', obj, function(){
      expect(before.called).to.be(true);
      expect(saved.called).to.be(true);
      store.off('beforesave',fn1);
      store.off('saved',fn2);
      done();
    });

  });
});

describe('测试失败',function(){
  var store = new Store({
    url:'data/store.json',
    proxy : {
      save : 'data/error.json',
      method : 'POST'
    }
  });

  it('测试保存失败',function(done){
    var exception = sinon.spy();

    store.on('exception', exception);

    var obj = {value: 1};
    obj.error = true;
    store.add(obj);
    store.save('add', obj);

    setTimeout(function(){
      expect(exception.called).to.be(true);
      done();
    }, 200);
  });
});

describe('测试保存本地数据,分别保存',function(){

  var records = [{a:'123',b:'456'},{a:'234',b:'456'},{a:'214',b:'124'}],
    store = new Store({
      data : records
    });
  it('测试初始化',function(){
    var result = store.getResult();
    expect(records).not.to.be(result);
    expect(records.length).to.be(result.length);
  });

  it('测试添加记录',function(){
    var obj = {};
    store.add(obj);
    var result = store.getResult();
    expect(result.length).not.to.be(records.length);
    store.save('add',obj);
    expect(result.length).to.be(records.length);
  });

  it('测试删除记录',function(){
    var obj = store.find('a','123');
    store.remove(obj);
    var result = store.getResult();
    expect(result.length).not.to.be(records.length);
    store.save('remove',obj);
    expect(result.length).to.be(records.length);
  });

});

describe('测试保存本地数据,集体保存',function(){
  var records = [{a:'123',b:'456'},{a:'234',b:'456'},{a:'214',b:'124'}],
    store = new Store({
      data : records
    });
  it('测试初始化',function(){
    var result = store.getResult();
    expect(records).not.to.be(result);
    expect(records.length).to.be(result.length);
  });
  it('测试保存数据',function(){
    var obj = {};
    store.add(obj);

    var obj = store.find('a','123');
    store.remove(obj);

    store.add({});
    var result = store.getResult();
    expect(records.length).not.to.be(result.length);
    store.save('all');
    expect(records.length).to.be(result.length);
  });
});
