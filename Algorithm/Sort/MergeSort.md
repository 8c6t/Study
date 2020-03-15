병합 정렬(Merge Sort)
========

- 배열을 앞부분과 뒷부분으로 나누어 각각 정렬한 다음 병합하는 작업을 반복하여 정렬을 수행하는 알고리즘
  - 분할 정복 알고리즘
- 시간 복잡도: O(n log n)

### 구현

```java
public void mergeSort(int arr[], int left, int right) {
  if(left < right) {
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid+1, right);
    merge(arr, left, mid, right);
  }
}

public void merge(int[] arr, int left, int mid, int right) {
  int leftArrIdx  = left;
  int rightArrIdx = mid + 1;
  int tempArrIdx  = left;

  int temp[] = new int[arr.length];

  while(leftArrIdx <= mid && rightArrIdx <= right) {
    if(arr[leftArrIdx] < arr[rightArrIdx]) {
        temp[tempArrIdx++] = arr[leftArrIdx++];
    } else {
        temp[tempArrIdx++] = arr[rightArrIdx++];
    }
  }

  // 좌측 배열이 아직 남은 경우
  while(leftArrIdx <= mid) {
    temp[tempArrIdx++] = arr[leftArrIdx++];
  }

  // 우측 배열이 아직 남은 경우
  while(rightArrIdx <= right) {
    temp[tempArrIdx++] = arr[rightArrIdx++];
  }

  // 정렬된 임시 배열의 값을 원 배열에 복사
  for(int i = left; i < tempArrIdx; i++) {
    arr[i] = temp[i];
  }
}
```