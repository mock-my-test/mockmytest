export default class MockMyTest {
    test(...spec_files: Array<string>) {
        console.log('test length:', spec_files.length, 'spec_files:', ...spec_files);
    };
    mock(...spec_files: Array<string>) {
        console.log('mock length:', spec_files.length, 'spec_files:', ...spec_files);
    };
};