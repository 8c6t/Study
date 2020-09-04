Plus One
========

- 유형: Array
- [https://leetcode.com/problems/plus-one/](https://leetcode.com/problems/plus-one/)
- 사용 언어: Java


## 문제

Given a non-empty array of digits representing a non-negative integer, increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.


## 풀이

```java
class Solution {
  public int[] plusOne(int[] digits) {
    for (int i = digits.length - 1; i >= 0; i--) {
      if (digits[i] != 9) {
        digits[i]++;
        break;
      } else {
        digits[i] = 0;
      }
    }

    if (digits[0] == 0) {
      int[] result = new int[digits.length + 1];
      result[0] = 1;
      return result;
    }

    return digits;
  }
}
```

- 1을 더해서 그 결과를 배열로 반환하는 문제
- 배열의 뒷 자리부터 해당 자리가 9인지 확인 
  - 9에 1을 더하는 경우 올림이 발생하므로 해당 자리값을 0으로 만들고 반복문을 계속 진행
  - 9가 아니라면 해당 자리값을 1 상승시키고 반복문을 종료
- 가장 앞 자리가 0이라면 모든 자리가 9이므로 길이가 1만큼 더 긴 배열은 만든 뒤 0번 인덱스 값을 1로 설정하고 반환
