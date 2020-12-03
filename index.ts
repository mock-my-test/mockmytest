class MockMyTest {
    public readonly text: string = 'MockMyTest';
    constructor() { };
    public test = (...spec_files: Array<string>): MockMyTest => {
        console.log('test length:', spec_files.length, 'spec_files:', ...spec_files);
        return this;
    };
    public mock = (...spec_files: Array<string>): MockMyTest => {
        console.log('mock length:', spec_files.length, 'spec_files:', ...spec_files);
        return this;
    };
};
module.exports = new MockMyTest();