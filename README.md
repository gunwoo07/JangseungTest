# 장승 기출 문제 사이트

## API
### testList API
- Code: Javascript(NodeJS)
- Method: POST
- Resquest: {}
- Response: 
```json
{
    "testList": [
        {
            "testName": "2021-2-2nd-mid-수학-은수진",
            "year": 2021,
            "grade": 2,
            "semester": "2nd",
            "exam": "mid",
            "subject": "수학",
            "teacher": "은수진"
        }
    ]
}
```

### Download API
- Code: Javascript(NodeJS)
- Method: POST
- Request
```json
{
    "testName": "2021-2-2nd-mid-수학-은수진"
}
```
- Response: Send File