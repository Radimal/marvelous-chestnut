export default class ScriptInjector {
  enabled = false;
  scriptsForPathname = {
    "/signup": ["EXAMPLE SCRIPT TO INJECT"],
  };

  constructor() {
    this.enabled = typeof window !== `undefined`;
    if (!this.enabled) return;

    this.pathname = window.location.pathname;
  }

  getScripts() {
    return this.scriptsForPathname[this.pathname] || [];
  }
}
