선택 정렬(Selection Sort)
========

- 가장 작은 요소부터 선택해 알맞은 위치로 옮겨서 순서대로 정렬하는 알고리즘
- 시간 복잡도: O(n^2)


## 구현

```java
public void selectionSort(int[] a) {
  int n = a.length;

  for (int i = 0; i < n - 1; i++) {
    int min = i;
    for (int j = i + 1; j < n; j++) {
      if (a[min] > a[j]) {
          min = j;
      }
    }
    swap(a, i, min);
  }
}
```

- 아직 정렬하지 않은 부분에서 가장 작은 요소를 탐색
- 선택한 최소값과 아직 정렬하지 않은 부분의 첫 번째 요소를 교환