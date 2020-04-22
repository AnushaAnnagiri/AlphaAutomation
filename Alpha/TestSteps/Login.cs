using NUnit.Framework;
using OpenQA.Selenium;
using System;

namespace TestAutomationFramework.Tests.TestSteps
{
    public class Login : TestBase
    {
        
        [Test(Description = "Login with Valid Credentials")]
        public void LoginFunction1()
        {
            driver.Url = "https://www.amazon.in/";
            driver.Manage().Window.Maximize();

            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step1.png", ScreenshotImageFormat.Png);


            IWebElement Burgerbutton = driver.FindElement(By.XPath("//i[@class='hm-icon nav-sprite']"));
            Burgerbutton.Click();
            IWebElement Signin = driver.FindElement(By.XPath("//a[contains(text(),'Sign In')]"));
            Signin.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step2.png", ScreenshotImageFormat.Png);
            IWebElement Email = driver.FindElement(By.XPath("//input[@id='ap_email']"));
            Email.SendKeys("bala21.eee@gmail.com");

            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step3.png", ScreenshotImageFormat.Png);
            IWebElement Continuebutton = driver.FindElement(By.XPath("//input[@id='continue']"));
            Continuebutton.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step4.png", ScreenshotImageFormat.Png);
            IWebElement Password = driver.FindElement(By.XPath("//input[@id='ap_password']"));
            Password.SendKeys("Balaji21@jd");

            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step5.png", ScreenshotImageFormat.Png);
            IWebElement Loginbutton = driver.FindElement(By.XPath("//input[@id='signInSubmit']"));
            Loginbutton.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction1\\Step6.png", ScreenshotImageFormat.Png);
            //Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();
            //ss.SaveAsFile("C:\\Users\\i29211\\Desktop\\Balaji Mohan\\Amazon Screenshot Result\\LoginFunction1\\Step7.png",
            //ScreenshotImageFormat.Png);
        }

        [Test(Description = "Login with Invalid Credentials")]        
        public void LoginFunction2()
        {

            driver.Url = "https://www.amazon.in/";
            driver.Manage().Window.Maximize();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2\\Step1.png", ScreenshotImageFormat.Png);

            IWebElement Burgermenu = driver.FindElement(By.XPath("//i[@class='hm-icon nav-sprite']"));
            Burgermenu.Click();
            IWebElement signin = driver.FindElement(By.XPath("//a[contains(text(),'Sign In')]"));
            signin.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2\\Step2.png", ScreenshotImageFormat.Png);
            IWebElement Email = driver.FindElement(By.XPath("//input[@id='ap_email']"));
            Email.SendKeys("000000");
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2\\Step3.png", ScreenshotImageFormat.Png);
            IWebElement Continuebutton = driver.FindElement(By.XPath("//input[@id='continue']"));
            Continuebutton.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2\\Step4.png", ScreenshotImageFormat.Png);
            IWebElement Password = driver.FindElement(By.XPath("//input[@id='ap_password']"));
            Password.SendKeys("Balaji@jd");
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2\\Step5.png", ScreenshotImageFormat.Png);
            IWebElement Loginbutton = driver.FindElement(By.XPath("//input[@id='signInSubmit']"));
            Loginbutton.Click();

            Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();
            ss.SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction2.png",
            ScreenshotImageFormat.Png);

        }

        [Test(Description = "Flipkart Login with Valid Credentials")]        
        public void LoginFunction3()
        {
            driver.Url = "https://www.flipkart.com/";
            driver.Manage().Window.Maximize();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step1.png", ScreenshotImageFormat.Png);
            IWebElement Login = driver.FindElement(By.XPath("//input[@class='_2zrpKA _1dBPDZ']"));
            Login.SendKeys("9655050120");
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step2.png", ScreenshotImageFormat.Png);
            IWebElement Pwd = driver.FindElement(By.XPath("//input[@class='_2zrpKA _3v41xv _1dBPDZ']"));
            Pwd.SendKeys("9655050120");
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step3.png", ScreenshotImageFormat.Png);
            IWebElement Logbtn = driver.FindElement(By.XPath("//button[@class='_2AkmmA _1LctnI _7UHT_c']"));
            Logbtn.Click();
            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step4.png", ScreenshotImageFormat.Png);

            ((ITakesScreenshot)driver).GetScreenshot().SaveAsFile("E:\\AlphaAutomation\\AlphaTestSuite\\AllureTestReport\\LoginFunction3\\Step1.png", ScreenshotImageFormat.Png);
        }        

    }
}
