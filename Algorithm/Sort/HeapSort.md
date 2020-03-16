힙 정렬(Heap Sort)
========

- Heap을 이용하여 정렬
  - 부모의 값이 자식의 값보다 항상 크거나 혹은 항상 작은 완전 이진트리
  - 가장 큰 값이 루트에 위치하는 특징을 이용하는 정렬 알고리즘
  - 힙에서 가장 큰 값인 루트를 꺼내는 작업을 반복하고 그 값을 늘어놓으면 배열은 정렬을 마치게 됨
- 선택 정렬을 응용한 알고리즘
- 시간 복잡도: O(n log n)

```java
public void heapSort(int[] a) {
  int n = a.length;

  // a[i] ~ a[n-1] 을 힙으로 만듬
  for (int i = (n - 1) / 2; i >= 0; i--) {
    heap(a, i, n - 1);
  }

  // 요소 교환 후 a[0] ~ a[i] 를 힙으로 만듬
  for (int i = n - 1; i > 0; i--) {
    swap(a, 0, i);
    heap(a, 0, i - 1);
  }
}

public void heap(int[] a, int left, int right) {
  int temp = a[left];     // 루트
  int child;              // 큰 값을 가진 노드
  int parent;             // 부모

  for (parent = left; parent < (right + 1) / 2; parent = child) {
    int cl = parent * 2 + 1;  // 왼쪽 자식
    int cr = cl + 1;          // 오른쪽 자식
    child = (cr <= right && a[cr] > a[cl]) ? cr : cl; // 큰 값을 가진 노드를 자식에 대입

    if (temp >= a[child]) {
        break;
    }

    a[parent] = a[child];
  }

  a[parent]= temp;
}
```

- 힙의 루트에 있는 가장 큰 값을 꺼내 배열 마지막 요소와 바꿈
- 가장 큰 값을 옮기면 그 값은 정렬을 마치게 됨
- 나머지 요소들로 힙을 만들면 두번째로 큰 요소가 루트에 위치하게 됨
- 해당 과정을 반복
