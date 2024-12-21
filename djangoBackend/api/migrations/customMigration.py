from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0003_job_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='summary',
            field=models.TextField(null=True, blank=True, db_collation='utf8mb4_general_ci'),
        ),
        migrations.RunSQL(
            sql='ALTER TABLE api_job MODIFY summary LONGTEXT',
            reverse_sql='ALTER TABLE api_job MODIFY summary TEXT',
        ),
    ]
