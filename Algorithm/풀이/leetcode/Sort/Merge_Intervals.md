Merge Intervals
========

- 유형: Sort
- [https://leetcode.com/problems/merge-intervals/](https://leetcode.com/problems/merge-intervals/)
- 사용 언어: Java


## 문제

Given a collection of intervals, merge all overlapping intervals.


## 풀이

```java
class Solution {
  public int[][] merge(int[][] intervals) {
    if (intervals.length == 0) {
      return intervals;
    }

    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    List<int[]> result = new ArrayList<>();
    int[] target = intervals[0];

    for (int i = 1; i < intervals.length; i++) {
      int[] current = intervals[i];

      if (target[1] >= current[0]) {
        target[1] = Math.max(target[1], current[1]);
      } else {
        result.add(target);
        target = current;
      }
    }

    if (!result.contains(target)) {
      result.add(target);
    }

    return result.toArray(new int[result.size()][2]);
  }
}
```

- 사이즈가 2인 1차원 배열(Interval) 중 겹치는 구간을 합치는 문제
- 0번 인덱스 값(시작)으로 정렬한 뒤, 배열을 순회하면서 겹치는 구간 여부를 확인
  - 겹치면 1번 인덱스 값을 두 Interval 중 큰 값으로 설정
  - 겹치지 않는다면 정렬을 했기 때문에 더 이상 겹치는 Interval이 존재할 수 없으므로 결과값에 저장
  