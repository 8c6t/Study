삽입 정렬(Insertion Sort)
========

- 선택한 요소를 그보다 더 앞쪽의 알맞은 위치에 삽입하는 작업을 반복하여 정렬
  - 선택 정렬은 값이 가장 작은 요소를 선택해 알맞은 위치로 이동한다는 점이 다름
- 시간 복잡도: O(n^2)

```java
public void insertionSort(int[] a) {
  int n = a.length;

  for(int i = 1 ; i < n; i++){
    int temp = arr[i];
    int j = i - 1;

    while((j >= 0) && (arr[j] > temp)) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = temp;
   }
}
```

- 2번째 요소(1번 인덱스)부터 선택하여 진행
- 왼쪽 요소(j)가 선택한 요소(temp)보다 크면 그 값을 대입하고, 앞으로 이동하면서 반복
- 선택한 값보다 작은 요소를 발견하면 그 앞은 정렬이 되어있으므로 해당 위치에 삽입할 값을 대입


### 개선(이진 삽입 정렬)

```java
public void binaryInsertionSort(int[] a) {
  int n = a.length;

  for (int i = 1; i < n; i++) {
    int key = a[i];
    int pl = 0,
        pr = i - 1,
        pc,
        pd;

    do {
      pc = (pl + pr) / 2;
      if (a[pc] == key)     break;
      else if (a[pc] < key) pl = pc + 1;
      else                  pr = pc - 1;
    } while (pl <= pr);

    pd = (pl <= pr) ? pc + 1 : pr + 1;

    for (int j = i; j > pd; j--) {
      a[j] = a[j-1];
    }

    a[pd] = key;
  }
}
```

- 이미 정렬된 부분을 이진 검색을 사용하여 삽입할 위치를 빨리 찾을 수 있도록 개선
