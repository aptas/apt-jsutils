/**
 * Safety net for logging. Ensures the presence of the console object.
 * Polyfill for missing log methods.
 * @author: apt-on
 */

module.exports = function ConsoleGate(win, noop) {
  this.win = win || window;
  this.noop = noop || function(){};

  /**
   * Turns off all logging.
   */
  this.denyAll = function(){
    this.allow(null);
  };

  /**
   * Turns off logging everywhere except for hostnames passed as arguments.
   */
  this.allowHosts = function() {
    this.allow(new RegExp([].slice.call(arguments).join('|')));
  };

  /**
   * Will fill in any missing log methods or the whole console object itself if needs be.
   */
  this.polyfill = function() {
    var fallback = this.win.console && this.win.console.log ? this.win.console.log : this.noop;
    this.win.console          = this.win.console          || {};
    this.win.console.log      = this.win.console.log      || fallback;
    this.win.console.debug    = this.win.console.debug    || fallback;
    this.win.console.info     = this.win.console.info     || fallback;
    this.win.console.trace    = this.win.console.trace    || fallback;
    this.win.console.warn     = this.win.console.warn     || fallback;
    this.win.console.error    = this.win.console.error    || fallback;
    this.win.console.count    = this.win.console.count    || fallback;
    this.win.console.group    = this.win.console.group    || fallback;
    this.win.console.groupEnd = this.win.console.groupEnd || fallback;
  };

  this.allow = function(hosts) {
    if (hosts === null || !hosts.test(this.win.location.host) || this.win.console === void 0) {
      this.win.console = {
        log : this.noop,
        trace : this.noop,
        debug : this.noop,
        info : this.noop,
        warn : this.noop,
        error : this.noop,
        count : this.noop,
        group : this.noop,
        groupEnd : this.noop
      };
    }
  };
};