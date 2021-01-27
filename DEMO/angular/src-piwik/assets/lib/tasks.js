var _TASKS_TEMPLATE = {
      "初始化": {
        "top": 120,
        "left": 720,
        "properties": {
          "title": "初始化",
          "inputs": {
          },
          "outputs": {
            "output_1": {
              "label": "输出"
            }
          }
        },
        "statement": "cG9vbCA9IGhhcHB5YmFzZS5Db25uZWN0aW9uUG9vbCgxLCAqKkhCQVNFQ09ORikKZmFtaWxpZXMgPSB7CgknaW5mbyc6IGRpY3QoKQp9CnRhYmxlcyA9IFsic3RfcHJvZF9oaWdoIiwgInN0X3Byb2RfaGF2ZV9yZWxhdGVfenkiLCAic3RfcHJvZF9oYXZlX3JlbGF0ZSIsICJzdF9jdXN0b21lcl9hbGFybSIsCgkJICAic3RfcHJvZF9zaG9ydHNpemUiLCAic3Rfc2t1X25lZWQiLCAic3Rfc2t1X2RlbGl2ZXIiLCAic3Rfc2t1X25lZWRfam0iLCAic3RfY3VzdG9tZXJfc3RvcmVfam0iLAoJCSAgInN0X3NrdV9kZWxpdmVyX2ptIl0JIyBzdF9vcmlnX3NrdSwgInN0X3Byb2RfcmVsYXRlX3p5IiwgInN0X3Byb2RfcmVsYXRlIgp3aXRoIHBvb2wuY29ubmVjdGlvbigpIGFzIGNvbjoKCVtjb24uZGVsZXRlX3RhYmxlKHgsIGRpc2FibGU9VHJ1ZSkgZm9yIHggaW4gdGFibGVzXQoJW2Nvbi5jcmVhdGVfdGFibGUoeCwgZmFtaWxpZXMpIGZvciB4IGluIHRhYmxlc10KI+a4hemZpOe7k+aenOihqApvcy5zeXN0ZW0oJycnZWNobyAiIyEvYmluL2Jhc2hcbmhiYXNlIHNoZWxsPDxFT0ZcbnRydW5jYXRlICd0b2Nfc3RfdHJhbnMnXG50cnVuY2F0ZSAndG9jX3N0X3RyYW5zX2ptJ1xuZXhpdFxuRU9GIiA+IC90bXAvZHJvcC5zaCcnJykKb3Muc3lzdGVtKCJzaCAvdG1wL2Ryb3Auc2giKQpjYWNoZXRhYmxlKGhjLCBbIm1fcHJvZHVjdCIsICJtX3Byb2R1Y3RfYWxpYXMiLCAic3Rfam9pbnN0b3JlIl0pCg=="
    },
      "设置目标值": {
        "top": 100,
        "left": 740,
        "properties": {
          "title": "设置目标值",
          "inputs": {
            "input_1": {
              "label": "输入"
            }
          },
          "outputs": {
            "output_1": {
              "label": "输出"
            }
          }
        },
        "statement": "ZGVmIHVwZGF0ZV90YXJnZXQocmRkcyk6CgljX25vdyA9IGRhdGV0aW1lLmRhdGV0aW1lLm5vdygpLnN0cmZ0aW1lKCIlWS0lbS0lZCAlSDolTTolUyIpCgljX2RhdGUgPSBkYXRldGltZS5kYXRldGltZS5ub3coKS5zdHJmdGltZSgiJVktJW0tJWQiKQoJdmFsdWVzID0ge30KCWZvciByZGQgaW4gcmRkczoKCQl2X3RhcmdldF9ub3cgPSByZGQudGFyZ2V0CgkJdl90YXJnZXQgPSByZGQudGFyZ2V0X251bQoJCXByb2RzID0gewoJCQkndGFyZ2V0Jzogdl90YXJnZXQsCgkJCSd0b2Nfb3Zlcic6IE5vbmUsCgkJCSd0b2NfZnVsbCc6IE5vbmUsCgkJCSdzaWduYWwnOiBOb25lCgkJfQoJCWlmIHZfdGFyZ2V0ID09IDA6CgkJCXByb2RzLnVwZGF0ZSh7CgkJCQkncmVkJzogTm9uZSwKCQkJCSd5ZWxsb3cnOiBOb25lLAoJCQkJJ2dyZWVuJzogTm9uZQoJCQl9KQoJCWVsaWYgdl90YXJnZXQgPT0gMToKCQkJcHJvZHMudXBkYXRlKHsKCQkJCSdyZWQnOiAwLAoJCQkJJ3llbGxvdyc6IDEsCgkJCQknZ3JlZW4nOiBOb25lCgkJCX0pCgkJZWxpZiB2X3RhcmdldCA9PSAyOgoJCQlwcm9kcy51cGRhdGUoewoJCQkJJ3JlZCc6IDEsCgkJCQkneWVsbG93JzogMiwKCQkJCSdncmVlbic6IE5vbmUKCQkJfSkKCQllbGlmIGZsb2F0KHZfdGFyZ2V0KSAlIDMgPT0gMDoKCQkJcHJvZHMudXBkYXRlKHsKCQkJCSdyZWQnOiB2X3RhcmdldCAvIDMsCgkJCQkneWVsbG93Jzogdl90YXJnZXQgKiAyIC8gMywKCQkJCSdncmVlbic6IHZfdGFyZ2V0CgkJCX0pCgkJZWxzZToKCQkJdl90YXJnZXQgPSBmbG9hdCh2X3RhcmdldCkKCQkJcHJvZHMudXBkYXRlKHsKCQkJCSdyZWQnOiBtYXRoLmNlaWwodl90YXJnZXQgLyAzKSwKCQkJCSd5ZWxsb3cnOiAobWF0aC5jZWlsKHZfdGFyZ2V0IC8gMykgKyBtYXRoLmZsb29yKHZfdGFyZ2V0IC8gMykpLAoJCQkJJ2dyZWVuJzogaW50KHZfdGFyZ2V0KQoJCQl9KQoJCWlmIHZfdGFyZ2V0X25vdyBpcyBOb25lOgoJCQlwcm9kcy51cGRhdGUoewoJCQkJJ2xhc3Rfc2lnbmFsJzogTm9uZSwKCQkJCSdsYXN0X2N0aW1lJzogTm9uZSwKCQkJCSdjeWNsZV9zdGFydCc6IE5vbmUsCgkJCQknbW9kaWZpZWRkYXRlJzogY19ub3cKCQkJfSkKCQkJaWYgcmRkLnNfaWQ6CgkJCQlwcm9kc1sncHV0X2RhdGUnXSA9IHJkZC52X3B1dGRhdGUKCQllbHNlOgoJCQlpZiByZGQuYWN0aXZlID09ICdZJzoKCQkJCXByb2RzLnVwZGF0ZSh7CgkJCQkJJ2xhc3Rfc2lnbmFsJzogcmRkLmxhc3Rfc2lnbmFsIG9yIDEsCgkJCQkJJ2xhc3RfY3RpbWUnOiBjX2RhdGUsCgkJCQkJJ2N5Y2xlX3N0YXJ0JzogY19kYXRlLAoJCQkJCSd1cF9zdGFydCc6IGNfZGF0ZSwKCQkJCQknZG93bl9zdGFydCc6IGNfZGF0ZSwKCQkJCQknbW9kaWZpZWRkYXRlJzogY19ub3cKCQkJCX0pCgkJCWVsc2U6CgkJCQlwcm9kcy51cGRhdGUoewoJCQkJCSdsYXN0X3NpZ25hbCc6IE5vbmUsCgkJCQkJJ2xhc3RfY3RpbWUnOiBOb25lLAoJCQkJCSdjeWNsZV9zdGFydCc6IE5vbmUsCgkJCQkJJ21vZGlmaWVkZGF0ZSc6IGNfbm93CgkJCQl9KQoJCXZhbHVlc1siJXMiICUgcmRkLmlkXSA9IHByb2RzCglpZiB2YWx1ZXM6CgkJcG9vbCA9IGhhcHB5YmFzZS5Db25uZWN0aW9uUG9vbCgxLCAqKkhCQVNFQ09ORikKCQl3aXRoIHBvb2wuY29ubmVjdGlvbigpIGFzIGNvbjoKCQkJdGFibGUgPSBjb24udGFibGUoJ3N0X3Byb2QnKQoJCQliID0gdGFibGUuYmF0Y2goYmF0Y2hfc2l6ZT0xMDAwKQoJCQlmb3IgaywgdiBpbiB2YWx1ZXMuaXRlbXMoKToKCQkJCWIucHV0KGssIGpzb25faGJhc2UodikpCgkJCWIuc2VuZCgpCgoKaGMuc3FsKF9zcWwpLmZvcmVhY2hQYXJ0aXRpb24odXBkYXRlX3RhcmdldCkKY2FjaGV0YWJsZShoYywgWyJzdF9wcm9kIiwgInZfZmFfc3RvcmFnZSJdKQ==",
        "sql": "c2VsZWN0IGEuaWQsIGIudGFyZ2V0X251bSwgYS50YXJnZXQsIGEubV9hdHRyaWJ1dGVzZXRpbnN0YW5jZV9pZCwgYS5jX3N0b3JlX2lkLCBhLnNrdWlkLCBhLmFjdGl2ZSwKYS5sYXN0X3NpZ25hbCwgdC5pZCBhcyBzX2lkLCB4LnZfcHV0ZGF0ZQpmcm9tIHN0X3Byb2QgYQpqb2luIHN0X3RhcmdldGl0ZW0gYiBvbiAoYS5jX3N0b3JlX2lkID0gYi5jX3N0b3JlX2lkIGFuZCBhLnNrdWlkID0gYi5tX3Byb2R1Y3RhbGlhc19pZCkKbGVmdCBqb2luIHZfZmFfc3RvcmFnZSB0IG9uICh0LmNfc3RvcmVfaWQgPSBhLmNfc3RvcmVfaWQgYW5kIHQubV9wcm9kdWN0YWxpYXNfaWQgPSBhLnNrdWlkKQpsZWZ0IGpvaW4gbV90cmFuc2Zlcl9kYXRlIHggb24gKHguY19kZXN0X2lkID0gYS5jX3N0b3JlX2lkIGFuZCB4Lm1fcHJvZHVjdGFsaWFzX2lkID0gYS5za3VpZCBhbmQgeC5tX2F0dHJpYnV0ZXNldGluc3RhbmNlX2lkID0gYS5tX2F0dHJpYnV0ZXNldGluc3RhbmNlX2lkKQp3aGVyZSBiLm1fcHJvZHVjdGFsaWFzX2lkID4gMCA="
    },
      "计算DBM": {
        "top": 120,
        "left": 720,
        "properties": {
          "title": "计算DBM",
          "inputs": {
            "input_1": {
              "label": "输入"
            }
          },
          "outputs": {}
        },
        "statement": "ZGVmIGNhbGNfZGJtKHJkZHMpOgoJcG9vbCA9IGhhcHB5YmFzZS5Db25uZWN0aW9uUG9vbCgxLCAqKkhCQVNFQ09ORikKCXdpdGggcG9vbC5jb25uZWN0aW9uKCkgYXMgY29ubjoKCQl0ID0gY29ubi50YWJsZSgnc3RfcHJvZCcpCgkJYiA9IHQuYmF0Y2goYmF0Y2hfc2l6ZT0xMDAwKQoJCWZsYWcgPSBGYWxzZQoJCWZvciByZGQgaW4gcmRkczoKCQkJaWYgcmRkLnRhcmdldCA+IDA6CgkJCQlwcm9kcyA9IHt9CgkJCQlvbmhhbmQgPSByZGQub25oYW5kICsgcmRkLnZfcmVsYXRlCgkJCQlvbndheSA9IHJkZC5vbndheSArIHJkZC52X3JlbGF0ZV93YXkKCQkJCWlmIG9uaGFuZCA8PSByZGQucmVkOgoJCQkJCXZfdG9jX292ZXIgPSByZGQudG9jX292ZXIgKyAocmRkLnJlZCAtIG1heChvbmhhbmQsIDApKQoJCQkJCXByb2RzWyd0b2Nfb3ZlciddID0gdl90b2Nfb3ZlcgoJCQkJCWlmIHZfdG9jX292ZXIgPj0gcmRkLnJlZDoKCQkJCQkJdl9yc3QgPSBmX2lzY29vbCgxLCByZGQubGFzdF9zaWduYWwsIHJkZC5sYXN0X2N0aW1lLCBjX25vdywgb25oYW5kLCBvbndheSwgcmRkLnRhcmdldCwKCQkJCQkJCQkJCSByZGQudHJhbnNfZGF5LCByZGQuYWxsX3F0eSkKCQkJCQkJaWYgdl9yc3QgPT0gMSBhbmQgcmRkLnNfcXR5ID4gMDoKCQkJCQkJCXBfcHJvZF9jaGFuZ2V0YXJnZXQocmRkLnRhcmdldCwgMSwgcmRkLmlkLCBjX25vdywgcHJvZHMsIHJkZC52X3N0b3JlX3RhcmdldCwKCQkJCQkJCQkJCQkJcmRkLnZfbWluX3RhcmdldCkKCQkJCWVsaWYgb25oYW5kID4gcmRkLnllbGxvdzoKCQkJCQl2X3RvY19mdWxsID0gcmRkLnRvY19mdWxsICsgMQoJCQkJCXByb2RzWyd0b2NfZnVsbCddID0gdl90b2NfZnVsbAoJCQkJCXZfdGRheV9tYXggPSBtYXgoMiAqIHJkZC50cmFuc19kYXksIDcpCgkJCQkJaWYgdl90b2NfZnVsbCA+PSB2X3RkYXlfbWF4IC0gMToKCQkJCQkJdl9yc3QgPSBmX2lzY29vbCgwLCByZGQubGFzdF9zaWduYWwsIHJkZC5sYXN0X2N0aW1lLCBjX25vdywgb25oYW5kLCBvbndheSwgcmRkLnRhcmdldCwKCQkJCQkJCQkJCSByZGQudHJhbnNfZGF5LCByZGQuYWxsX3F0eSkKCQkJCQkJaWYgdl9yc3QgPT0gMToKCQkJCQkJCWlmIHJkZC5wcm90ZWN0X2N5Y2xlOgoJCQkJCQkJCXB1dF9kYXRlID0gcmRkLnB1dF9kYXRlIGFuZCByZGQucHV0X2RhdGUuc3RyZnRpbWUoIiVZLSVtLSVkIikgb3IgJycKCQkJCQkJCQlpZiBwdXRfZGF0ZSBhbmQgKGRhdGV0aW1lLmRhdGV0aW1lLm5vdygpIC0gZGF0ZXRpbWUudGltZWRlbHRhKGRheXM9cmRkLnByb3RlY3RfY3ljbGUpKS5zdHJmdGltZSgKCQkJCQkJCQkJCSIlWS0lbS0lZCIpID4gcHV0X2RhdGU6CgkJCQkJCQkJCXBfcHJvZF9jaGFuZ2V0YXJnZXQocmRkLnRhcmdldCwgMCwgcmRkLmlkLCBjX25vdywgcHJvZHMsIHJkZC52X3N0b3JlX3RhcmdldCwKCQkJCQkJCQkJCQkJCQlyZGQudl9taW5fdGFyZ2V0KQoJCQkJCQkJZWxzZToKCQkJCQkJCQlwX3Byb2RfY2hhbmdldGFyZ2V0KHJkZC50YXJnZXQsIDAsIHJkZC5pZCwgY19ub3csIHByb2RzLCByZGQudl9zdG9yZV90YXJnZXQsCgkJCQkJCQkJCQkJCQlyZGQudl9taW5fdGFyZ2V0KQoJCQkJaWYgcHJvZHM6CgkJCQkJYi5wdXQoIiVzIiAlIHJkZC5pZCwganNvbl9oYmFzZShwcm9kcykpCgkJCQkJaWYgbm90IGZsYWc6CgkJCQkJCWZsYWcgPSBUcnVlCgkJaWYgZmxhZzoKCQkJYi5zZW5kKCkKaGMuc3FsKF9zcWwpLmZvcmVhY2hQYXJ0aXRpb24oY2FsY19kYm0pCnVuY2FjaGV0YWJsZShoYywgWyJzdF9wcm9kIl0pCg==",
        "sql": "c2VsZWN0IHQuY19vcmlnX2lkLCB0LmZyZWlnaHR0eXBlLCB0LnRyYW5zX2RheSwgdC5raW5kLCB0LnByb3RlY3RfY3ljbGUsCnAuaWQsIHAubV9wcm9kdWN0X2lkLCBwLnRhcmdldCwgcC5yZWQsIHAueWVsbG93LCBwLmdyZWVuLCBwLm9uaGFuZCwgcC5vbndheSwgY29hbGVzY2UocC50b2Nfb3ZlciwgMCkgYXMgdG9jX292ZXIsCmNvYWxlc2NlKHAudG9jX2Z1bGwsIDApIGFzIHRvY19mdWxsLCBwLnNpZ25hbCwgcC5sYXN0X3NpZ25hbCwgcC5sYXN0X2N0aW1lLCBwLnB1dF9kYXRlLCBwLm1fYXR0cmlidXRlc2V0aW5zdGFuY2VfaWQsCmNvYWxlc2NlKHIudl9yZWxhdGUsIDApIGFzIHZfcmVsYXRlLCBjb2FsZXNjZShyLnZfcmVsYXRlX3dheSwgMCkgYXMgdl9yZWxhdGVfd2F5LCBtc3EuYWxsX3F0eSwKY29hbGVzY2Uocy5xdHksIDApIGFzIHNfcXR5LCBzai5taW5fdGFyZ2V0IGFzIHZfc3RvcmVfdGFyZ2V0LCBzbXQubWluX3RhcmdldCBhcyB2X21pbl90YXJnZXQKZnJvbSBzdF9mcmVpZ2h0c3RvcmUgdApsZWZ0IGpvaW4gc3RfcHJvZCBwIG9uIChwLmNfc3RvcmVfaWQgPSB0LmNfZGVzdF9pZCBhbmQgcC5raW5kID0gdC5raW5kKQpsZWZ0IGpvaW4gc3Rfam9pbnN0b3JlIHNqIG9uIHNqLmNfc3RvcmVfaWQgPSBwLmNfc3RvcmVfaWQKbGVmdCBqb2luIHN0X21pbl90YXJnZXQgc210IG9uIChzbXQuY19zdG9yZV9pZCA9IHAuY19zdG9yZV9pZCBhbmQgc210Lm1fZGltNF9pZCA9IHAubV9kaW00X2lkKQpsZWZ0IGpvaW4gbV9zdG9yYWdlX3F0eSBtc3Egb24gKG1zcS5jX3N0b3JlX2lkID0gcC5jX3N0b3JlX2lkIGFuZCBtc3Euc2t1aWQgPSBwLnNrdWlkKQpsZWZ0IGpvaW4gKApTRUxFQ1QgY29hbGVzY2UoU1VNKHF0eSksIDApIGFzIHZfcmVsYXRlLCBjb2FsZXNjZShTVU0ocXR5X3dheSksIDApIGFzIHZfcmVsYXRlX3dheSwgMSBhcyBzdG9yZV9raW5kLCAKY19zdG9yZV9pZCwgc2t1aWQKRlJPTSBzdF9wcm9kX3JlbGF0ZV96eQpncm91cCBieSBjX3N0b3JlX2lkLCBza3VpZAp1bmlvbiBhbGwKU0VMRUNUIGNvYWxlc2NlKFNVTShxdHkpLCAwKSBhcyB2X3JlbGF0ZSwgY29hbGVzY2UoU1VNKHF0eV93YXkpLCAwKSBhcyB2X3JlbGF0ZV93YXksIDIgYXMgc3RvcmVfa2luZCwgCmNfc3RvcmVfaWQsIHNrdWlkCkZST00gc3RfcHJvZF9yZWxhdGUKZ3JvdXAgYnkgY19zdG9yZV9pZCwgc2t1aWQKKXIgb24gKHIuY19zdG9yZV9pZCA9IHAuY19zdG9yZV9pZCBhbmQgci5za3VpZCA9IHAuc2t1aWQgYW5kIHAuc3RvcmVfa2luZCA9IHIuc3RvcmVfa2luZCkKbGVmdCBqb2luICgKc2VsZWN0IHN1bShhLnF0eSkgYXMgcXR5LCBhLmNfc3RvcmVfaWQsIGEubV9wcm9kdWN0X2lkLCBhLm1fYXR0cmlidXRlc2V0aW5zdGFuY2VfaWQKZnJvbSByZXRhaWxfdG1wIGEKd2hlcmUgYS5zdGF0dXMgPSAyCmFuZCBhLnJldGFpbGJpbGx0eXBlID0gJ0NNUicKYW5kIGEuYmlsbGRhdGUgPj0gJyR7c19iZWZvcmVfZGF5fScKYW5kIGEuYmlsbGRhdGUgPD0gJyR7b25lX2JlZm9yZV9kYXl9Jwpncm91cCBieSBhLmNfc3RvcmVfaWQsIGEubV9wcm9kdWN0X2lkLCBhLm1fYXR0cmlidXRlc2V0aW5zdGFuY2VfaWQKKXMgb24gKHMuY19zdG9yZV9pZCA9IHAuY19zdG9yZV9pZCBhbmQgcy5tX3Byb2R1Y3RfaWQgPSBwLm1fcHJvZHVjdF9pZCBhbmQgcy5tX2F0dHJpYnV0ZXNldGluc3RhbmNlX2lkID0gcC5tX2F0dHJpYnV0ZXNldGluc3RhbmNlX2lkKQp3aGVyZSAgcC5hY3RpdmUgPSAnWScKQU5EIHAub3duZWQgPSAnWScKQU5EIHAucGF1c2UgPSAnTicKQU5EIHAudGFyZ2V0IElTIE5PVCBOVUxMCkFORCBwLm9uaGFuZCBJUyBOT1QgTlVMTA=="
    },
      "自定义": {
        "top": 120,
        "left": 720,
        "properties": {
          "title": "自定义任务",
          "inputs": {
            "input_1": {
              "label": "输入 1"
            },
            "input_2": {
              "label": "输入 2"
            }
          },
          "outputs": {
            "output_1": {
              "label": "输出 1"
            },
            "output_2": {
              "label": "输出 2"
            }
          }
        },
        "statement": ""
    }
}
