/**
 * 
 */
package com.pluralsight.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pluralsight.model.Goal;
import com.pluralsight.model.GoalReport;
import com.pluralsight.repository.GoalRepository;

/**
 * @author ankurbrdwj
 *
 */
@Service("goalService")
public class GoalServiceImpl implements GoalService {

	/**
	 * 
	 */
	
	@Autowired
	private GoalRepository gp;
	public GoalServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.pluralsight.service.GoalService#save(com.pluralsight.model.Goal)
	 */
	@Transactional
	public Goal save(Goal goal) {
		// TODO Auto-generated method stub
		return gp.save(goal);
	}

	public List<Goal> findAllGoals() {
		// TODO Auto-generated method stub
		return gp.loadAll();
	}

	public List<GoalReport> findAllGoalReports() {
		// TODO Auto-generated method stub
		return gp.findAllGoalReports();
		
	}

}
