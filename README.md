# @mock-my-test/mockmytest
## 기존 Unit Test 환경의 문제점
1. `caller`의 어떤 `method`에 대한 unit test 개수는, 호출하는 `callee`의 `method` 별 가능한 반환값 종류에 따라 exponent하게 증가함
    ```
    caller.method() {
        callee.method1();
        callee.method2();
    }
    ```
    * `caller.method`에 필요한 unit test 개수 = `callee.method1`의 반환값 종류 * `callee.method2`의 반환값 종류
    
1. `callee`의 `method`들이 잘못 mocking된 경우, `caller`의 unit test가 성공해도 정상동작하지 않음

1. 오동작을 확인(e.g., integration test 시행 단계)까지 많은 시간이 소요되며, 원인 파악에 많은 시간과 노력을 필요로 할 수 있음

## 해결 방안
* (충분히 잘 작성된) `callee`의 unit test를 사용하여 mocking하면, `caller`의 unit test 성공 시 정상 동작이 보장됨
  1. 두 모듈 간 `protocol spec`에 대해 `callee`의 unit test 작성
  
  1. `caller`의 unit test에서 `callee`의 unit test로부터 mocking된 객체를 사용
  
* `protocol spec` = (`module`, `initial state`, `method`, `input arguments`, `result`)

## 장점
1. mocking 실수로 인한 integration test 실패가 사라짐

1. Unit test 중 protocol에 있는 문제 확인 가능

1. Protocol 변경이 있을 경우, `protocol spec` 변경만으로 caller와 callee 모두 잘 동작하는지 확인 가능

## 예제
### number guessing game
1. `callee`: 무작위 숫자 생성 및 질문에 대한 답변

1. `caller`: 맞추는데 걸린 횟수에 따른 점수 산출
