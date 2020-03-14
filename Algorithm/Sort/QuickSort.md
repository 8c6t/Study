퀵 정렬(Quick Sort)
========

- 정렬의 기준이 되는 피벗을 정하고, 피벗보다 작은 그룹과 큰 그룹으로 나눈 뒤 각 그룹에 대해 해당 과정을 반복하는 정렬 알고리즘
  - 분할 정복 알고리즘
- 시간 복잡도: O(n log n)


### 구현

```java
public void quickSort(int[] a, int left, int right) {
  int pl = left;
  int pr = right;
  int pivot = a[(left + right) / 2];

  do {
    while (a[pl] < pivot) pl++;
    while (a[pr] > pivot) pr--;

    if (pl <= pr) {
      swap(a, pl++, pr--);
    }
  } while (pl <= pr);

  if (left < pr)  quickSort(a, left, pr);
  if (pl < right) quickSort(a, pl, right);
}
```

- 피벗 이하의 요소를 배열의 왼쪽으로, 이상의 요소를 배열 오른쪽으로 옮김
  - a[pl] >= pivot 이 성립하는 요소를 찾을 때까지 pl을 오른쪽으로 이동
  - a[pr] <= pivot 이 성립하는 요소를 찾을 때까지 pr을 왼쪽으로 이동
- pl, pr이 교차하면 해당 그룹에 대한 정렬이 종료됨
- 요소가 2개 이상인 그룹에 대해서만 나누어 정렬을 반복
  - left < pr 인 경우 왼쪽 그룹을 나눔
  - pl < right 인 경우 오른쪽 그룹을 나눔
