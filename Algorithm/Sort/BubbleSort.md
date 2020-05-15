버블 정렬(Bubble Sort)
========

- n개의 원소를 가진 배열을 정렬할 때, 인접한 두 개의 데이터를 비교해가며 정렬을 진행하는 방식
- 가장 큰 값을 배열의 맨 끝으로 이동시키면서 정렬하고자 하는 원소의 개수 만큼 두 번 반복하게 됨
- 시간 복잡도: O(n^2)


## 구현

```java
public void bubbleSort(int[] a) {
  int n = a.length - 1;

  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - i; j++) {
      if (a[j] > a[j + 1]) {
          swap(a, j, j + 1);
      }
    }
  }
}
```

## 개선

### 1. 교환 횟수 비교

```java
public void bubbleSortCount(int[] a) {
  int n = a.length - 1;

  for (int i = 0; i < n; i++) {
    int count = 0;
    for (int j = 0; j < n - i; j++) {
        if (a[j] > a[j + 1]) {
            swap(a, j, j + 1);
            count++;
        }
    }

    if (count == 0) break;
  }
}
```
- 교환 횟수가 0이면 더 이상 정렬할 요소가 없다는 뜻
- 각 패스별 교환 횟수를 체크하여 0인 경우 반복문 종료


### 2. 마지막 교환 위치

```java
public void bubbleSortLast(int[] a) {
  int n = a.length - 1;
  int k = 0;

  while (k < n) {
    int last = n;
    for (int i = n; i > k; i--) {
      if (a[i - 1] > a[i]) {
        swap(a, i - 1, i);
        last = i;
      }
    }
    k = last;
  }
}
```
- 어떤 시점 이후 교환이 수행되지 않는다면 그보다 앞쪽의 요소는 이미 정렬을 마친 상태
- 교환이 이루어지지 않은 인덱스(k)를 체크, 다음 패스부터는 범위를 제한함으로서 정렬된 요소들을 제외한 나머지에 대해 정렬을 수행
