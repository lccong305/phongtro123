const validate = (payload, setInvalidFields) => {
    // console.log(payload);
    let invalids = 0;
    let fields = Object.entries(payload)
    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          massage: 'Không được để trống trường này !'
        }])
        invalids++;
      }
    })

    fields.forEach(item => {
      switch (item[0]) {
        case 'password':
          if (item[1].length < 6) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Mật khẩu phái có tối thiểu 6 kí tự !'
            }])
            invalids++;
          }
          break;
        case 'phone':
          if (!+item[1]) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Số điện thoại phải là các số !'
            }])
            invalids++;
          }
          if (+item[1].length !== 10) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Số điện thoại phải có đủ 10 số !'
            }])
            invalids++;
          }
          break;
        case 'priceNumber':
          if (+item[1] === '') {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Chưa đặt giá trị cho trường này !'
            }])
            invalids++;
          }
          if (!+item[1]) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Trường này phải là một con số !'
            }])
            invalids++;
          }
          // if (+item[1] < 10000) {
          //   setInvalidFields(prev => [...prev,{
          //     name: item[0],
          //     massage: 'Trường này phải có giá trị tối thiểu là 100000 !'
          //   }])
          //   invalids++;
          // }
          break;
          case 'areaNumber':
          if (+item[1] === '') {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Chưa đặt giá trị cho trường này !'
            }])
            invalids++;
          }
          if (!+item[1]) {
            setInvalidFields(prev => [...prev,{
              name: item[0],
              massage: 'Trường này phải là một con số !'
            }])
            invalids++;
          }
          break;
 
        default:
          break;
      }
    })
    return invalids;
  }

  export default validate