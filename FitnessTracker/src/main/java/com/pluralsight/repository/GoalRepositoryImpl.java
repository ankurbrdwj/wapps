/**
 * 
 */
package com.pluralsight.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import com.pluralsight.model.Goal;
import com.pluralsight.model.GoalReport;

/**
 * @author ankurbrdwj
 *
 */
@Repository("goalRepository")
public class GoalRepositoryImpl implements GoalRepository {

	/**
	 * 
	 */
	@PersistenceContext
	private EntityManager em;
	public GoalRepositoryImpl() {
		// TODO Auto-generated constructor stub
	}

	/* (non-Javadoc)
	 * @see com.pluralsight.repository.GoalRepository#save(com.pluralsight.model.Goal)
	 */
	public Goal save(Goal goal) {
		// TODO Auto-generated method stub
		if(goal.getId()==null){
		em.persist(goal);
		em.flush();
		}else{
			
			goal=em.merge(goal);
		}
		return goal;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List<Goal> loadAll() {
	//Query query =em.createQuery("Select g from Goal g");
	
		TypedQuery<Goal> query=em.createNamedQuery(Goal.FIND_ALL_GOALS,Goal.class);
		
	
	return query.getResultList();
	}

	public List<GoalReport> findAllGoalReports() {
		// TODO Auto-generated method stub
//		Query query= em.createQuery("Select new com.pluralsight.model.GoalReport(g.minutes,e.minutes,e.activity)"+
//		"from Goal g ,Exercise e where g.id=e.goal.id");
		TypedQuery<GoalReport> query=em.createNamedQuery(Goal.FIND_GOAL_REPORTS,GoalReport.class);
		return query.getResultList();
	}

}
