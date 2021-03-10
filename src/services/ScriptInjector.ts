interface Script {
  src: string;
  iframe: string;
}

const hubSpotGetInfoMeeting: Script = {
  src: `https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js`,
  iframe: `<div class="meetings-iframe-container" data-src="https://meetings.hubspot.com/radimal/getinfo?embed=true"></div>`,
};

const termlyPrivacyPolicy: Script = {
  src: `https://app.termly.io/embed-policy.min.js`,
  iframe: `<div name="termly-embed" data-id="14f0305a-0c13-4fda-b620-4c76dbf47686" data-type="iframe"></div>`,
};

const termlyCookiePolicy: Script = {
  src: `https://app.termly.io/embed-policy.min.js`,
  iframe: `<div name="termly-embed" data-id="82207b25-088b-4c2e-84c3-872dfd427c69" data-type="iframe"></div>`,
};

export default class ScriptInjector {
  pathname?: string;

  constructor() {
    if (typeof window !== `undefined`) {
      this.pathname = window.location.pathname.replace(/\/+$/, "");
    }
  }

  scriptForPage(): Script | undefined {
    if (this.pathname === "/signup") {
      return hubSpotGetInfoMeeting;
    } else if (this.pathname === "/privacy-policy") {
      return termlyPrivacyPolicy;
    } else if (this.pathname === "/cookie-policy") {
      return termlyCookiePolicy;
    }
  }
}
