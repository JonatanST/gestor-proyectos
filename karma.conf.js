/*
 Licencia: 
  * Archivo: LICENSE
  * Fecha: 2025
  * Todos los derechos de propiedad intelectual e industrial sobre esta
  * aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
  * Su uso, alteracion, reproduccion o modificacion sin el debido
  * consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
  *
  * Este programa se encuentra protegido por las disposiciones de la
  * Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
  * propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
  * previstas en la Ley.
  * @FilePath: 
 */

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('node:path').join(__dirname, './coverage'),
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.' },
      ],
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    // Para poder usar ChromeHeadlessCI en angular.jso
    customLaunchers: {
      chromeHeadlessCi: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
  });
};
