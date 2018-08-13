module.exports = class Bundle {
  getPath() {
    return __dirname;
  }

  initialize(application) {
    application.on("bundles_initialized", this.onBundlesInitialized);
  }

  async onBundlesInitialized(application) {
    const configuration = application.getParameter("configuration");
    const serviceContainer = application.getParameter("serviceContainer");
    if (configuration && serviceContainer) {
      serviceContainer.addParameterResolver((parameter) => {
        const resolved = configuration.resolvePropertyValue(parameter);
        if (parameter !== resolved) {
          return resolved;
        }

        return undefined;
      });
    }
  }
};
