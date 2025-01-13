// файл script.js
window.onload = function()
{ 
    let a = ''
    let b = ''
    let q = ''
    let expressionResult = ''
    let selectedOperation = null
    let Op = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if (a=='Infinity')
            {
                a=''
            }
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
                if ((digit=='0' && a=='0')|| (a=='' && digit=='0'))
                {
                    a=''
                }
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                if ((digit=='0' && b=='0')|| (b=='' && digit=='0'))
                {
                    b=''
                }
                q = b
                Op = ''        
            }
            outputElement.innerHTML = b
        }
    }
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        q = ''
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        q = ''
        selectedOperation = '+'
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        q = ''
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        q = ''
        selectedOperation = '/'
    }

    document.getElementById("btn_op_sign").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {
            b*=-1
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a*=-1
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_percent").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {
            b=a*b/100
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a*=1/100
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_fac").onclick = function()
    {
        if ((b==='' && a!='') || b!='')
        {
            outputElement.innerHTML = 'Много хочешь, вычисляю до 4 символов'
            a = ''
            b = ''
            q = ''
            selectedOperation = ''
            Op = ''
            expressionResult = ''
        }
        count = 1
        if (a==='')return
        if (b!='' && b.length<4)
        {
            while(b!=1)
            {
                count*=b
                b--
            }
            b=count
            outputElement.innerHTML = b
        }
        if (b==='' && a!='' && a.length<4)
        {
            while(a!=1)
            {
                count*=a
                a--
            }
            a=count
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_nul").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {
            b+='000'
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a+='000'
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_delete").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {     
            b = b.slice(0,-1);
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a = a.slice(0,-1);
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_sqrt").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {     
            b=Math.sqrt(b);
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a=Math.sqrt(a);
            outputElement.innerHTML = a
        }
    }
    document.getElementById("btn_op_pow").onclick = function()
    {
        if (a==='')return
        if (b!='')
        {     
            b=Math.pow(b,2);
            outputElement.innerHTML = b
        }
        if (b==='' && a!='')
        {
            a=Math.pow(a,2);
            outputElement.innerHTML = a
        }
    }
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        q = ''
        selectedOperation = ''
        Op = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        console.log('asas')
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        switch(Op)
        {
            case '+':
                expressionResult = (+a) + (+q)
                break;
            case '-':
                expressionResult = (+a) - (+q)
                break;
        
        }
        switch(selectedOperation) 
        { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                Op ='+'
                break;
            case '-':
                expressionResult = (+a) - (+b)
                Op = '-'
                break;
            case '/':
                if (b==='0')
                {expressionResult = 0}
                else{expressionResult = (+a) / (+b)}
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }
    const button = document.getElementById('change-color');
    const images = [
        'ewq.jpg', 
        'qwe.jpg', 
        'qq.jpg', 
        'ww.jpg'
    ];

    let currentIndex = 0;

    function changeBackground() 
    {
       currentIndex = (currentIndex + 1) % images.length;
       document.body.style.backgroundImage = `url(${images[currentIndex]})`;
    }

    button.addEventListener('click', changeBackground);

    const resColor = document.getElementById('ResColor');
    const ccolor = [
        'rgb(128, 128, 128)', 
        'rgb(107, 63, 60)', 
        'rgb(251, 198, 207)', 
        'rgb(169, 169, 169)'
    ];
    let Ind = 0;
    function changeResCol()
    {
        Ind = (Ind + 1) % ccolor.length;
        c = document.getElementById('result')
        c.style.backgroundColor = `${ccolor[Ind]}`;
    }
    resColor.addEventListener('click', changeResCol);
};