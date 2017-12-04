module.exports = knex => ({
    getQueues: async () =>
        await knex("Queues")
            .select(
                "date",
                "class_room",
                "Queues.id",
                {lessonName: "Lessons.name"},
                {lessonShortName: "Lessons.short_name"},
                {lessonType: "Lessons_Types.name"},
                {group: "Groups.code"},
                "Students.name",
                "Students.email",
                "Students.photo"
            )
            .where({
                is_main: 1
            })
            .innerJoin("Lessons", "Queues.lesson", "Lessons.id")
            .innerJoin("Lessons_Types", "Queues.type_lesson", "Lessons_Types.id")
            .innerJoin("Groups", "Queues.group_id", "Groups.id")
            .innerJoin("Places", "Queues.id", "Places.queue")
            .innerJoin("Students", "Places.student", "Students.id"),
    getStudent: async email =>
        (await knex("Students")
            .select()
            .where({email}))[0],
    addStudentToQueue: async ({queue, student}) => await knex("Places").insert({queue, student}),
    isStudentInQueue: async (queue, student) =>
        (await knex("Places")
            .select()
            .where({queue, student}))[0]
});
