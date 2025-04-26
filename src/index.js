import { connect } from 'puppeteer-real-browser';


(async () => {
    
    const nick = ""
    const password = ""

    // Launch the browser and open a new blank page
    const { page, browser } = await connect({
    
        /* executablePath: 'C:\\Users\\danie\\AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe',
        ignoreDefaultArgs: ['--desable-extensions'], */
        headless: false
    });

    //await page.setViewport({width: 1280, height: 720});

    // Navegar na pagina pela URL
    await page.goto('https://retroachievements.org/', {
        WaitUntil: 'domcontantloaded'
    });

    try {
        await page.waitForSelector('footer', { timeout: 8000 })
        console.log("footer")
    } catch {
        console.log("footernao")
    }
    
    const svgElement = await page.$('svg.icon.mr-1');
    if (svgElement) {
        console.log('Elemento SVG encontrado!');
    } else {
        console.log('Elemento SVG não encontrado!');
        
    }

    try {
        if(svgElement) {
            await page.evaluate(svg => {
                svg.parentElement.click()
            }, svgElement)
        }
        console.log("clickado")
    } catch {
        console.log("nao clickado")
        
    }

    try {
        await page.waitForSelector('img', { timeout: 4000 })
        console.log("tela de login carregado")
    } catch {
        console.log("nao carregou")
    }

    try {
        const userinput = await page.$('input[name="User"]')
        const passwordinput = await page.$('div.flex.flex-row > input[name="password"]')
        
        if(userinput) await userinput.type(nick);
        userinput.press('Enter')
        
        if(passwordinput) await passwordinput.type(password);
        
    } catch (e) {
        console.log("nao foi" + e)
        
    }
    
    try {
        await page.locator('button.btn.whitespace-nowrap.w-full.text-center.py-2').click()
        console.log("Login feito");
        
    } catch {
        console.log("Erro ao fazer login")
        
    }

    try {
        await page.waitForSelector('footer', { timeout: 8000 })
        console.log("footer")
    } catch {
        console.log("footernao")
    }

    try {
        await page.locator('div.dropdown.nav-item').hover()
        console.log("hover funcionou");
        
        await page.locator('a[href="https://retroachievements.org/game-list/play"]').click()
        console.log("indo para WTPG");
        
    } catch {
        console.log("hover nao funciona");
    }
    
    await browser.close() 
    
    console.log('Encerrou')
})();
