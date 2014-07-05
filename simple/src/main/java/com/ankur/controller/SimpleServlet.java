package com.ankur.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SimpleServlet
 */
@WebServlet(urlPatterns={"/simple","*.do"})
public class SimpleServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       String appName="My application";
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SimpleServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    public void init() throws ServletException{
    	appName=getServletContext().getInitParameter("ProductName");
    }
	/**
	 * @see Servlet#getServletConfig()
	 */
	public ServletConfig getServletConfig() {
		// TODO Auto-generated method stub
		return null;
	}

	/**
	 * @see Servlet#getServletInfo()
	 */
	public String getServletInfo() {
		// TODO Auto-generated method stub
		return null; 
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		//get Header
		String header=request.getHeader("host");
		//content
		String content=request.getContentType();
		//read parameter
		String name=request.getParameter("name");
		if(name!=null){
			response.setContentType("text/xml");
			response.setHeader("X-Custom-Header", (new Date()).toString());
			PrintWriter out=response.getWriter().printf("<application>"
			+"<message>Hello %s</message>"
					+ "<products>%s</products>"
			+"</application>",name,appName);
			
		}else{
			throw new ServletException("The name should be entered");
			//response.getWriter().write("Please Enter a name");
		}
		

		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	String name =request.getParameter("name");
	if(name != null && name!=""){
		response.getWriter().printf("Hello"+ name);
	}else{
	response.getWriter().printf("Please enter a name");
	}
	
	}

}
