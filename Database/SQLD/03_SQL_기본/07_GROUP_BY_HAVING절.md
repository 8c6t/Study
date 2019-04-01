GROUP BY, HAVING 절
========

## 1. 집계 함수(Aggregate Function)

### 가. 특징

- 여러 행들의 그룹이 모여서 그룹당 단 하나의 결과를 돌려주는 다중행 함수
- GROUP BY 절은 행들을 소그룹화 한다
- SELECT 절, HAVING 절, ORDER BY 절에 사용 가능
- 일반적으로 집계 함수는 GROUP BY 절과 같이 사용되지만, 테이블 전체가 하나의 그룹이 되는 경우에는 GROUP BY 절 없이 단독으로도 사용 가능


### 나. 종류

| 집계 함수 | 사용 목적 |
|-|-|
| COUNT(*) | NULL 값을 포함한 행의 수를 출력 |
| COUNT(표현식) | 표현식이 값이 NULL값인 것을 제외한 행의 수를 출력 |
| `SUM([DISTINCT | ALL] 표현식)` | 표현식의 NULL 값을 제외한 합계를 출력 |
| `AVG([DISTINCT | ALL] 표현식)` | 표현식의 NULL 값을 제외한 평균을 출력 |
| `MAX([DISTINCT | ALL] 표현식)` | 표현식의 최대값을 출력. 문자, 날짜 데이터 타입도 사용 가능 |
| `MIN([DISTINCT | ALL] 표현식)` | 표현식의 최소값을 출력. 문자, 날짜 데이터 타입도 사용 가능 |
| `STDDEV([DISTINCT | ALL] 표현식)` | 표현식의 표준 편차를 출력 |
| `VARIAN([DISTINCT | ALL] 표현식)` | 표현식의 분산을 출력 |


## 2. GROUP BY 절과 HAVING 절의 특성

1. GROUP BY 절을 통해 소그룹별로 기준을 정한 후, SELECT 절에 집계 함수를 사용한다
2. 집계 함수의 통계 정보는 NULL 값을 가진 행을 제외하고 수행한다
3. GROUP BY 절에는 SELECT 절과는 달리 ALIAS명을 사용할 수 없다
4. 집계 함수는 WHERE 절에는 올 수 없다 -> 집계 함수를 사용할 수 있는 GROUP BY 절보다 WHERE 절이 먼저 수행되기 때문
5. WHERE 절은 전체 데이터를 GROUP으로 나누기 전에 행들을 미리 제거시킨다
6. HAVING절은 GROUP BY 절의 기준 항목이나 소그룹의 집계 함수를 이용한 조건을 표시할 수 있다
7. GROUP BY 절에 의한 소그룹별로 만들어진 집계 데이터 중, HAVING 절에서 제한 조건을 두어 조건을 만족하는 내용만 출력한다
8. HAVING 절은 일반적으로 GROUP BY 절 뒤에 위치한다


## 3. GROUP BY 절

`SELECT [DISTINCT] 컬럼명 [ALIAS명] FROM 테이블명 [WHERE 조건식] [GROUP BY 컬럼OR표현식] [HAVING 그룹조건식]`

- GROUP BY 절은 SQL 문에서 FROM 절과 WHERE 절 뒤에 위치
- 데이터들을 작은 그룹으로 분류하여 소그룹에 대한 항목별로 통계 정보를 얻을 때 추가로 사용
- GROUP BY 절에서 그룹 단위를 표시해 주어야 SELECT 절에서 그룹 단위의 컬럼과 집계 함수를 사용할 수 있다


## 4. HAVING 절

- FROM 절에 정의된 집합의 개별 행에 **WHERE 절의 조건절이 먼저 적용**되고, WHERE 절의 조건에 맞는 행이 GROUP BY 절의 대상이 된다.
- 즉, HAVING 절은 WHERE 절과 비슷하지만 그룹을 나타내는 결과 집합의 행에 조건이 적용된다는 점에서 차이가 있다
- GROUP BY 절과 HAVING 절의 순서를 바꾸어서 수행해도 동일한 결과를 반환하지만, 논리적으로 순서를 지키는 것을 권고한다

### GROUP BY 소그룹의 데이터 중 일부만 필요한 경우

1. GROUP BY 연산 전 WHERE 절에서 조건을 적용하여 필요한 데이터만 추출하여 GROUP BY 연산
2. GROUP BY 연산 후 HAVING 절에서 필요한 데이터만 필터링

> 가능하면 WHERE 절에서 조건절을 적용하여 GROUP BY의 계산 대상을 줄이는 것이 효율적인 자원 사용 측면에서 바람직


### SELECT 절에서 사요하지 않은 집계 함수를 HAVING 절에서 조건절로 사용한 경우

- HAVING절은 SELECT 절에 사용되지 않은 컬럼이나 집계 함수가 아니더라도 GROUP BY 절의 기준 항목이나 소그룹의 집계 함수를 이용한 조건을 표시할 수 있다
- 이때 WHERE 절의 조건 변경은 대상 데이터의 개수가 변경되므로 결과 데이터 값이 변경될 수 있지만, HAVING 절의 조건 변경은 결과 데이터 변경은 없고 출력되는 레코드의 개수만 변경될 수 있다


## 5. 집계 함수와 NULL

- 다중 행 함수는 입력 값으로 전체 건수가 NULL 값인 경우만 함수의 결과가 NULL이 나온다
- 전체 건수 중에서 일부만 NULL인 경우는 NULL인 행을 **다중 행 함수의 대상에서 제외**한다