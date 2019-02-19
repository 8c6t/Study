CSS 선택자
========

원 목적인 CSS 디자인을 적용할 요소를 선택하는 것부터 jQuery, jSoup와 같은 라이브러리에 이르기까지 높은 활용도를 가진 CSS 선택자 중 가장 많이 이용되는 선택자들에 대한 사용 방법을 정리


## 선택자 기본 서식

| 서식 | 설명 | 예시 |
|-|-|-|
| * | 모든 요소 | `*` |
| 요소명 | 요소명이 일치하는 요소 | `p` |
| .클래스명 | 클래스 속성 값이 일치하는 요소 | `.wrapper`  |
| #id명 | id 속성의 값이 일치하는 요소 | `#btnSubmit` |


## 선택자끼리의 관계를 지정하는 서식

| 서식 | 설명 | 예시 |
|-|-|-|
| 선택자, 선택자 | 열거된 **복수**의 선택자 | `div, p` |
| A선택자 B선택자 | A선택자의 **하위 계층** 중 B선택자에 해당하는 후손 요소 | `div p` |
| A선택자 > B선택자 | A선택자의 **바로 아래 계층** 중 B선택자에 해당하는 자식 요소 | `div>h1` |
| A선택자 + B선택자 | 같은 계층에 A선택자 **바로 뒤**에 있는 B선택자 **한 개** | `h1+h2` |
| A선택자 ~ B선택자 | 같은 계층에 A선택자 **바로 뒤**에 있는 B선택자 **모두** | `p~ul` |


## 선택자의 속성에 따른 지정 서식

| 서식 | 설명 | 예시 |
|-|-|-|
| 요소[attr] | 특정 속성을 가지는 요소를 선택 | `a[target]` |
| 요소[attr='val'] | attr 속성의 값이 val인 요소. val 값이 전체 일치해야 함 | `	a[target=_blank]` |
| 요소[attr~='val'] | attr 속성의 값에 val을 단어로(스페이스로 구분) 포함하는 요소 | `a[title~=flower]` |
| 요소[attr&#124;='val'] | attr 속성의 값이 val이거나 val로 시작하고 뒤에 하이픈(-)요소가 있는 모든 요소 | `a[title~=flower]` |
| 요소[attr^='val'] | attr 속성의 값이 val로 시작하는 요소 | `a[href^="https"]` |
| 요소[attr$='val'] | attr 속성의 값이 val로 끝나는 요소 | `a[href$=".pdf"]` |
| 요소[attr*='val'] | attr 속성의 값에 val을 포함하는 요소 | `a[href*="w3schools"]` |

**※ 요소 생략 시 그 속성을 가진 모든 요소를 선택**
>ex) [target] : target 속성을 가지는 모든 요소

## 위치나 상태를 지정하는 서식

| 서식 | 설명 | 예시 |
|-|-|-|
| :root | Document의 루트 요소 | `:root` |
| 요소:not(selector) | 선택자 이외의 요소 | `h1:not(p)` |
| 요소:nth-child(n) | 동위 요소 중 n번째에 위치한 요소 | `p:nth-child(2)` |
| 요소:nth-last-child(n) | 동위 요소 중 뒤에서 n번째 위치한 요소 | `p:nth-last-child(2)` |
| 요소:nth-of-type(n) | 동위 요소 중 지정한 요소 중 n번째 요소 | `p:nth-of-type(2)` | 
| 요소:first-of-type | 동위 요소 중 지정한 요소 중 첫 번째 요소 | `p:first-of-type` |
| 요소:last-of-type | 동위 요소 중 지정한 요소 중 마지막 요소 | `p:last-of-type` | 
| 요소:first-child | 동위 요소 중 첫 번째 요소 | `p:first-child` |
| 요소:last-child | 동위 요소 중 마지막 요소 | `p:last-child` |
| 요소:only-child | 동위 요소 없이 한 개의 요소만 있을 때 해당 요소 | `p:only-child` |
| 요소:only-of-type | 동위 요소 중 지정한 요소가 하나만 있을 때 해당 요소 | `p:only-of-type` |
| 요소:empty | 내용이 빈 요소 | `p:empty` |
| 요소:lang(language) | 특정 언어로 된 요소 | `p:lang(it)`(Italian) |
| 요소:enabled | 활성화된 UI 요소 | `input:enabled` |
| 요소:disabled | 비활성화된 UI 요소 | `input:disabled` |
| 요소:checked | 체크된 UI 요소 | `:checked` |

**※ 요소 생략 시 그 속성을 가진 모든 요소를 선택**

---
> 참고 사이트: 
[w3school css selector](https://www.w3schools.com/cssref/css_selectors.asp)