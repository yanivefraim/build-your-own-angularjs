/* jshint globalstrict: true */
'use strict';

function Scope() {
	this.$$watchers = [];
}

Scope.prototype.$watch = function(watchFn, listenerFn) {
  var watcher = {
    watchFn: watchFn,
    listenerFn: listenerFn || function() { }
  };
  this.$$watchers.push(watcher);
};


Scope.prototype.$digest = function() {
  var dirty;
  do {
    dirty = this.$$digestOnce();
  } while (dirty);
};

Scope.prototype.$$digestOnce = function() {
  var self = this;
  var dirty;
  this.$$watchers.forEach(function(watcher) {
    var newValue = watcher.watchFn(self);
    var oldValue = watcher.last;
    if (newValue !== oldValue) {
      watcher.listenerFn(newValue, oldValue, self);
      dirty = true;
    }
    watcher.last = newValue;
  });
  return dirty;
};
